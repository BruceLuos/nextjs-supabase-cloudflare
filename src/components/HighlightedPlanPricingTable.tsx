"use client";
import { Button } from "flowbite-react";
import { Fragment, useState } from "react";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import { User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";
import Stripe from "stripe";
import {
  Cash,
  ClipboardCheck,
  FaceGrinStars,
  FileMusic,
  Fire,
  Lock,
  MessageCaption,
} from "flowbite-react-icons/solid";
import { useTranslations } from "next-intl";
import { Clock } from "flowbite-react-icons/outline";

export interface Product {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  images: string[];
  price: Price;
  isProduct1?: boolean;
  isProduct2?: boolean;
}

export interface Price {
  id: string;
  active: boolean;
  product_id: string | Stripe.Product | Stripe.DeletedProduct;
  type: Stripe.Price.Type;
  unit_amount: number | null;
  currency: string;
}
interface Props {
  user: User | null | undefined;
  products: Product[] | [];
  locale: string;
}

export function HighlightedPlanPricingTable({ user, products, locale }: Props) {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();
  const t = useTranslations("index.plan");

  const product1 = products.findIndex((product) => product.isProduct1);
  const product2 = products.findIndex((product) => product.isProduct2);

  /** handle stripe 结账 */
  const handleStripeCheckout = async (product: Product) => {
    console.log("product", product);
    setPriceIdLoading(product.price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/sign-in");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      product,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  return (
    <section className="" id="pricing">
      <div className="mx-auto max-w-screen-xl px-2 sm:px-4 xl:px-0 py-8 sm:py-16">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t("title")}
          </h2>
          <p className="mb-5 text-gray-500 dark:text-gray-400 sm:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-3 xl:gap-10 items-center justify-center">
          {/* free */}
          <div className="mx-auto flex max-w-xl flex-col rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-900 xl:max-w-lg xl:p-8 w-[320px] sm:w-[400px] h-[545px]">
            <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
              {t("plan1.title")}
            </h3>
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
              $0
            </span>
            <p className="mb-1 mt-4 text-gray-500 dark:text-gray-400">
              {t("plan1.description")}
            </p>
            <Button
              onClick={() => {
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
              }}
              className="my-6 dark:bg-gray-700 dark:hover:bg-gray-600"
              color="dark"
            >
              {t("plan1.buttonText")}
            </Button>
            <ul className="space-y-4 text-left text-gray-900 dark:text-white">
              <li className="flex items-center space-x-3">
                <FileMusic className="h-5 w-5 shrink-0" />
                <span> {t("plan1.text1")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Cash className="h-5 w-5 shrink-0" />
                <span>{t("plan1.text2")}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <FaceGrinStars className="h-5 w-5 shrink-0" />
                <span className="line-through">{t("plan1.text3")}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <ClipboardCheck className="h-5 w-5 shrink-0" />
                <span className="line-through">{t("plan1.text4")}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Fire className="h-5 w-5 shrink-0" />
                <span className="line-through">{t("plan1.text5")}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <MessageCaption className="h-5 w-5 shrink-0" />
                <span className="line-through">{t("plan1.text6")}</span>
              </li>
            </ul>
          </div>
          {/* popular */}
          <div className="mx-auto flex max-w-xl flex-col rounded-lg border border-primary-600 bg-white p-6 text-center shadow dark:bg-gray-900 xl:max-w-lg xl:p-8 w-[320px] sm:w-[400px] h-[586px]">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
              {t("plan2.title")}
            </h3>
            {[products[product1]].map((product) => {
              const priceString = new Intl.NumberFormat(
                `${locale === "zh-TW" ? "zh" : locale}`,
                {
                  style: "currency",
                  currency: product.price.currency!,
                  minimumFractionDigits: 0,
                }
              ).format((product.price?.unit_amount || 0) / 100);
              return (
                <Fragment key={product.id}>
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white mt-12">
                    {priceString}
                  </span>
                  <p className="mb-1 mt-4 text-gray-500 dark:text-gray-400">
                    {t("plan2.description")}
                  </p>
                  <Button
                    type="button"
                    isProcessing={priceIdLoading === product.price.id}
                    onClick={() => handleStripeCheckout(product)}
                    className="my-6"
                  >
                    {t("plan2.buttonText")}
                  </Button>
                </Fragment>
              );
            })}

            <ul className="space-y-4 text-left text-gray-900 dark:text-white">
              <li className="flex items-center space-x-3">
                <FileMusic className="h-5 w-5 shrink-0 underline" />
                <span className="underline"> {t("plan2.text1")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Cash className="h-5 w-5 shrink-0" />
                <span> {t("plan2.text2")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-5 w-5 shrink-0" />
                <span> {t("plan2.text7")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaceGrinStars className="h-5 w-5 shrink-0" />
                <span> {t("plan2.text3")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <ClipboardCheck className="h-5 w-5 shrink-0" />
                <span> {t("plan2.text4")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Lock className="h-5 w-5 shrink-0" />
                <span> {t("plan2.text5")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCaption className="h-5 w-5 shrink-0" />
                <span> {t("plan2.text6")}</span>
              </li>
            </ul>
          </div>
          {/* basic */}
          <div className="mx-auto flex max-w-xl flex-col rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-900 xl:max-w-lg xl:p-8 w-[320px] sm:w-[400px] h-[545px]">
            <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
              {t("plan3.title")}
            </h3>
            {[products[product2]].map((product) => {
              const priceString = new Intl.NumberFormat(
                `${locale === "zh-TW" ? "zh" : locale}`,
                {
                  style: "currency",
                  currency: product.price.currency!,
                  minimumFractionDigits: 0,
                }
              ).format((product.price?.unit_amount || 0) / 100);
              return (
                <Fragment key={product.id}>
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    {priceString}
                  </span>
                  <p className="mb-1 mt-4 text-gray-500 dark:text-gray-400">
                    {t("plan3.description")}
                  </p>
                  <Button
                    type="button"
                    isProcessing={priceIdLoading === product.price.id}
                    onClick={() => handleStripeCheckout(product)}
                    className="my-6 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    {t("plan3.buttonText")}
                  </Button>
                </Fragment>
              );
            })}

            <ul className="space-y-4 text-left text-gray-900 dark:text-white">
              <li className="flex items-center space-x-3">
                <FileMusic className="h-5 w-5 shrink-0 underline" />
                <span> {t("plan3.text1")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Cash className="h-5 w-5 shrink-0" />
                <span> {t("plan3.text2")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-5 w-5 shrink-0" />
                <span> {t("plan3.text7")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaceGrinStars className="h-5 w-5 shrink-0" />
                <span> {t("plan3.text3")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <ClipboardCheck className="h-5 w-5 shrink-0" />
                <span> {t("plan3.text4")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Lock className="h-5 w-5 shrink-0" />
                <span> {t("plan3.text5")}</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCaption className="h-5 w-5 shrink-0" />
                <span> {t("plan3.text6")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
