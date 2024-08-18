import { stripe } from "@/utils/stripe/config";
import Stripe from "stripe";
import { HighlightedPlanPricingTable } from "./HighlightedPlanPricingTable";
import { getAuthUserData } from "@/utils/db-operation";

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function PricingSection({
  params: { locale },
}: PageProps) {
  const user = await getAuthUserData();

  // 从stripe中获取产品数据
  const stripeProducts = await stripe.products.list({
    active: true,
  });

  // 产品信息和价格组合
  const mergeProducts = await Promise.all(
    stripeProducts.data.reverse().map(async (product) => {
      const priceData = await stripe.prices.list({
        product: product.id,
        active: true,
      });
      const price = priceData.data.find(
        (price) => price.product === product.id
      ) as Stripe.Price;
      return {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description,
        images: product.images,
        isProduct1: product.id === process.env.STRIPE_PRODUCT_ID1,
        isProduct2: product.id === process.env.STRIPE_PRODUCT_ID2,
        price: {
          id: price.id,
          active: price.active,
          product_id: price.product,
          type: price.type,
          unit_amount: price.unit_amount,
          currency: price.currency,
        },
      };
    })
  );

  // console.log("mergeProducts", mergeProducts);

  return (
    <HighlightedPlanPricingTable
      user={user}
      products={mergeProducts ?? []}
      locale={locale}
    />
  );
}
