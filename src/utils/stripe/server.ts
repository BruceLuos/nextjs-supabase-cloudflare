"use server";

import Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";
import { createClient } from "@/utils/supabase/server";
import { createOrRetrieveCustomer } from "@/utils/supabase/admin";
import {
  getURL,
  getErrorRedirect,
  calculateTrialEndUnixTimestamp,
} from "@/utils/helpers";
import { Product } from "@/components/HighlightedPlanPricingTable";

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

/** stripe 结账处理 */
export async function checkoutWithStripe(
  product: Product,
  redirectPath: string = "/"
): Promise<CheckoutResponse> {
  try {
    // Get the user from Supabase auth
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error(error);
      throw new Error("Could not get user session.");
    }

    // Retrieve or create the customer in Stripe
    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user?.id || "",
        email: user?.email || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      // 收集账单地址默认auto
      billing_address_collection: "auto",
      customer,
      customer_update: {
        address: "auto",
      },
      // 发票账单开启
      invoice_creation: {
        enabled: true,
      },
      // metadata 存入当前产品信息,方便当前产品映射对应积分
      metadata: {
        product_id: product.price.product_id as string,
        product_name: product.name,
        product_description: product.description,
      },
      line_items: [
        {
          price: product.price.id,
          quantity: 1,
        },
      ],
      cancel_url: getURL(),
      success_url: getURL(redirectPath),
    };

    // 重复订阅
    if (product.price.type === "recurring") {
      params = {
        ...params,
        mode: "subscription",
        subscription_data: {
          // trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
        },
      };
    } else if (product.price.type === "one_time") {
      // 一次性产品
      params = {
        ...params,
        mode: "payment",
      };
    }

    // Create a checkout session in Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create checkout session.");
    }

    // Instead of returning a Response, just return the data or error.
    if (session) {
      return { sessionId: session.id };
    } else {
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          "Please try again later or contact a system administrator."
        ),
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        ),
      };
    }
  }
}

/** stripe 客户门户 */
export async function createStripePortal(currentPath: string) {
  try {
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (error) {
        console.error(error);
      }
      throw new Error("Could not get user session.");
    }

    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL(currentPath),
      });
      if (!url) {
        throw new Error("Could not create billing portal");
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error("Could not create billing portal");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        currentPath,
        error.message,
        "Please try again later or contact a system administrator."
      );
    } else {
      return getErrorRedirect(
        currentPath,
        "An unknown error occurred.",
        "Please try again later or contact a system administrator."
      );
    }
  }
}
