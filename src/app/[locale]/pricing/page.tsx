import PricingSection from "@/components/PricingSection";
import HeadingWithCTAButtonSection from "@/components/HeadingCTA";
import config from "@/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const meta: Metadata = {
    metadataBase: new URL(`${config.siteMetadata.siteUrl}`),
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    openGraph: {
      title: t("pricingTitle"),
      description: t("pricingDescription"),
      url: "./",
      siteName: t("title"),
      type: "website", // article
      images: [config.siteMetadata.socialBanner],
      // locale: "en_US",
    },
    alternates: {
      canonical: `/${locale === "en" ? "" : locale + "/"}pricing`,
      languages: {
        "x-default": `${config.siteMetadata.siteUrl}pricing`,
        en: `${config.siteMetadata.siteUrl}pricing`,
        id: `${config.siteMetadata.siteUrl}id/pricing`,
        pt: `${config.siteMetadata.siteUrl}pt/pricing`,
        de: `${config.siteMetadata.siteUrl}de/pricing`,
        es: `${config.siteMetadata.siteUrl}es/pricing`,
        fr: `${config.siteMetadata.siteUrl}fr/pricing`,
        it: `${config.siteMetadata.siteUrl}it/pricing`,
        vi: `${config.siteMetadata.siteUrl}vi/pricing`,
        ko: `${config.siteMetadata.siteUrl}ko/pricing`,
        ja: `${config.siteMetadata.siteUrl}ja/pricing`,
        zh: `${config.siteMetadata.siteUrl}zh/pricing`,
        "zh-TW": `${config.siteMetadata.siteUrl}zh-TW/pricing`,
      },
    },
    twitter: {
      title: t("pricingTitle"),
      card: "summary_large_image",
      site: `${config.siteMetadata.siteUrl}${
        locale === "en" ? "" : locale
      }/pricing`,
      description: t("pricingDescription"),
      images: [config.siteMetadata.socialBanner],
    },
    other: {
      ["twitter:url"]: `${config.siteMetadata.siteUrl}${
        locale === "en" ? "" : locale + "/"
      }pricing`,
    },
  };
  return meta;
}

export default async function PricingPage({ params: { locale } }: PageProps) {
  return (
    <>
      <PricingSection params={{ locale }} />
      <HeadingWithCTAButtonSection />
    </>
  );
}
