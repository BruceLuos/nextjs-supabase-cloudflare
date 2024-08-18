// import { toDateTime } from "@/utils/helpers";
// import { stripe } from "@/utils/stripe/config";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import type { Database, TablesInsert } from "@/types_db";

const toDateTime = (secs: number) => {
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? "",
  {
    httpClient: Stripe.createFetchHttpClient(),
  }
);

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

/** 更新顾客记录 */
const updateCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from("users")
    .update({ stripe_customer_id: customerId })
    .eq("id", uuid);

  if (upsertError)
    throw new Error(
      `Supabase customer record creation failed: ${upsertError.message}`
    );

  return customerId;
};

/** 创建stripe顾客 */
const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  if (!newCustomer) throw new Error("Stripe customer creation failed.");

  return newCustomer.id;
};

/** 创建或检索stripe顾客 */
const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  // 检查 Supabase 中是否已存在该客户
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("users")
      .select("stripe_customer_id")
      .eq("id", uuid)
      .maybeSingle();
  console.log("createOrRetrieveCustomer uuid", uuid);
  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
  }

  // 使用 Supabase 客户 ID 检索 Stripe 客户 ID，并使用电子邮件回退
  let stripeCustomerId: string | undefined;
  if (existingSupabaseCustomer?.stripe_customer_id) {
    const existingStripeCustomer = await stripe.customers.retrieve(
      existingSupabaseCustomer.stripe_customer_id
    );
    stripeCustomerId = existingStripeCustomer.id;
  } else {
    // 如果 Supabase 中缺少 Stripe ID，尝试通过电子邮件检索 Stripe 客户 ID
    const stripeCustomers = await stripe.customers.list({ email: email });
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
  }

  // 如果仍然没有 stripeCustomerId，则在 Stripe 中创建一个新客户
  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createCustomerInStripe(uuid, email);
  if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.");

  if (existingSupabaseCustomer && stripeCustomerId) {
    // 如果 Supabase 有记录但与 Stripe 不匹配，则更新 Supabase 记录
    if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
      const { error: updateError } = await supabaseAdmin
        .from("users")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", uuid);

      if (updateError)
        throw new Error(
          `Supabase customer record update failed: ${updateError.message}`
        );
      console.warn(
        `Supabase customer记录与 Stripe ID 不匹配。 Supabase 记录已更新.`
      );
    }
    // 如果 Supabase 有记录且与 Stripe 匹配，则返回 Stripe 客户 Id
    return stripeCustomerId;
  } else {
    console.warn(`Supabase customer记录不存在。创造新customer纪录`);
    // 更新user表中顾客id
    const upsertedStripeCustomer = await updateCustomerToSupabase(
      uuid,
      stripeIdToInsert
    );
    if (!upsertedStripeCustomer)
      throw new Error("Supabase customer record creation failed.");

    return upsertedStripeCustomer;
  }
};

/** 用户积分变化处理 */
const manageUserPointsChange = async (
  checkoutSession: Stripe.Checkout.Session,
  createAction = false
) => {
  // 获取满足stripe_customer_id的用户信息
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("stripe_customer_id", checkoutSession.customer!)
    .single();

  if (noCustomerError)
    throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

  const { id: uuid } = customerData!;

  // 创建一个映射对象，产品id对应的一个增加积分的数量
  const pointsMapArr = [
    {
      id: process.env.STRIPE_PRODUCT_ID1,
      points: process.env.STRIPE_PRODUCT_POINTS1,
    },
    {
      id: process.env.STRIPE_PRODUCT_ID2,
      points: process.env.STRIPE_PRODUCT_POINTS2,
    },
    {
      id: process.env.STRIPE_PRODUCT_ID3,
      points: process.env.STRIPE_PRODUCT_POINTS3,
    },
  ];

  const resultPoint = pointsMapArr.find((obj) => {
    return obj.id === checkoutSession.metadata!.product_id!;
  });
  // 改变的积分数
  const changePoints = parseInt(resultPoint?.points!);

  // 修改用户总积分points
  // 先找当前用户拥有的总积分
  const { data: userData, error: noUserDataError } = await supabaseAdmin
    .from("users")
    .select("plan_limit,paid_amount,plan_expire_at")
    .eq("id", uuid)
    .single();

  if (noUserDataError)
    throw new Error(`UserPonints lookup failed: ${noUserDataError.message}`);

  // 根据plan_expire_at或当前时间，加一年时间
  let plan_expire_at = userData?.plan_expire_at
    ? new Date(userData.plan_expire_at)
    : new Date();
  plan_expire_at.setFullYear(plan_expire_at.getFullYear() + 1);

  // 更新用户数据
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({
      plan_limit: (userData?.plan_limit || 0) + changePoints,
      paid_amount:
        (userData?.paid_amount || 0) + (checkoutSession.amount_total || 0),
      plan_type: 1, // 1 为付费用户
      plan_expire_at: plan_expire_at.toISOString(), // 过期时间
      updated_at: new Date().toISOString(),
    })
    .eq("id", uuid);

  if (updateError)
    throw new Error(`User update failed: ${updateError.message}`);
  console.log(`更新用户 [${uuid}] 的总积分数 [${userData.plan_limit}]`);

  // 因为checkout.session.completed 和 payment_intent_created的触发时机不同，可能会导致积分记录会重复修改数据产生异常
  // 检查是否需要创建一个新的积分记录
  const { data: orderData, error: noOrderError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("trade_id", checkoutSession.payment_intent!);

  if (noOrderError)
    throw new Error(`Order lookup failed: ${noOrderError.message}`);

  const paymentData: TablesInsert<"orders"> = {
    user_id: uuid,
    trade_id: checkoutSession.payment_intent as string,
    stripe_customer_id: checkoutSession.customer as string,
    status: "succeeded",
    amount: checkoutSession.amount_total,
    currency: checkoutSession.currency,
    product_id: checkoutSession.metadata!.product_id,
    product_description: checkoutSession.metadata!.product_description,
    product_name: checkoutSession.metadata!.product_name,
    paid_time: toDateTime(checkoutSession.created).toISOString(),
    date: toDateTime(checkoutSession.created).toISOString(),
  };

  if (!orderData.length) {
    console.log(
      "checkout.session.completed 比 payment_intent_created 先触发, order记录不存在"
    );
    // 不存在账单记录，创建一个新的账单
    const { error: upsertOrderError } = await supabaseAdmin
      .from("orders")
      .upsert(paymentData);
    if (upsertOrderError)
      throw new Error(
        `Order insert/update failed: ${upsertOrderError.message}`
      );
    console.log(
      `插入 Order 记录 [${checkoutSession.payment_intent!}] for user [${uuid}]`
    );
  } else {
    // 已存在账单,修改账单表状态，补充商品信息
    const { error: updateOrderError } = await supabaseAdmin
      .from("orders")
      .update({
        product_id: checkoutSession.metadata!.product_id,
        product_description: checkoutSession.metadata!.product_description,
        product_name: checkoutSession.metadata!.product_name,
        paid_time: toDateTime(checkoutSession.created).toISOString(),
        status: "succeeded",
      })
      .eq("trade_id", checkoutSession.payment_intent!);

    if (updateOrderError)
      throw new Error(`Order update failed: ${updateOrderError.message}`);
    console.log(
      `更新 Order 成功 status ${"succeeded"} in checkout [${
        checkoutSession.payment_intent
      }] for user [${uuid}]`
    );
  }
};

/** 用户账单处理 */
const manageUserOrderChange = async (payment: Stripe.PaymentIntent) => {
  // 先查看账单记录是否存在，不存在则upsert,存在则update
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("stripe_customer_id", payment.customer!)
    .single();

  if (noCustomerError)
    throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

  const { id: uuid } = customerData!;

  // 查处是否已存在账单
  const { data: orderData, error: noOrderError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("trade_id", payment.id);

  if (noOrderError)
    throw new Error(`Order lookup failed: ${noOrderError.message}`);

  // 账单数据
  const paymentData: TablesInsert<"orders"> = {
    user_id: uuid,
    trade_id: payment.id,
    stripe_customer_id: payment.customer as string,
    status: payment.status,
    amount: payment.amount,
    currency: payment.currency,
    date: toDateTime(payment.created).toISOString(),
  };
  if (!orderData.length) {
    console.log("账单信息没有找到，创建新的账单记录");
    const { error: upsertOrderError } = await supabaseAdmin
      .from("orders")
      .upsert(paymentData);
    if (upsertOrderError)
      throw new Error(
        `Order insert/update failed: ${upsertOrderError.message}`
      );
    console.log(`插入 Order 成功 [${payment.id}] for user [${uuid}]`);
  } else {
    console.log("账单已存在，更新");
    // 已有同样的账单，修改账单的状态
    const { error: updateOrderError } = await supabaseAdmin
      .from("orders")
      .update(paymentData)
      .eq("trade_id", payment.id);

    if (updateOrderError)
      throw new Error(`Order update failed: ${updateOrderError.message}`);
    console.log(
      `更新 Order 成功 status ${payment.status} [${payment.id}] for user [${uuid}]`
    );
  }
};

export {
  createOrRetrieveCustomer,
  manageUserPointsChange,
  manageUserOrderChange,
};
