import "../globals.css";
import { notFound } from "next/navigation";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { locales } from "@/navigation";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import config from "@/config";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { WebVitals } from "@/components/Webvitals";
import GoogleSignInComponent from "@/components/GoogleSignInComponent";
import AnalysisScript from "@/components/AnalysisScript";
const FlowbiteToaster = React.lazy(
  () => import("@/components/ui/FlowbiteToasts/toaster")
);

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const meta: Metadata = {
    metadataBase: new URL(`${config.siteMetadata.siteUrl}`),
    title: {
      default: t("title"),
      template: `%s`,
    },
    description: t("description"),
    applicationName: `${config.siteMetadata.applicationName}`,
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "./",
      siteName: t("title"),
      type: "website", // article
      images: [config.siteMetadata.socialBanner], // 可用本地opengraph-image.png
      // locale: "en_US",
    },
    alternates: {
      canonical: `/${locale === "en" ? "" : "/" + locale}`, // 定义页面的规范 URL，避免不同语言但重复内容的url指向
      languages: {
        "x-default": "/",
        en: "/",
        id: "/id",
        pt: "/pt",
        de: "/de",
        es: "/es",
        fr: "/fr",
        it: "/it",
        vi: "/vi",
        ko: "/ko",
        ja: "/ja",
        zh: "/zh",
        "zh-TW": "/zh-TW",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      title: t("title"),
      card: "summary_large_image",
      images: [config.siteMetadata.socialBanner],
      site: `${config.siteMetadata.siteUrl}${locale === "en" ? "" : locale}`,
      description: t("description"),
    },
    // icons: [
    //   {
    //     rel: "apple-touch-icon",
    //     sizes: "180x180",
    //     url: "/logo-180x180.png",
    //   },
    //   {
    //     rel: "icon",
    //     sizes: "32x32",
    //     url: "/logo-32x32.png",
    //   },
    //   {
    //     rel: "icon",
    //     sizes: "16x16",
    //     url: "/logo-16x16.png",
    //   },
    //   {
    //     rel: "icon",
    //     sizes: "192x192",
    //     url: "/logo-192x192.png",
    //   },
    //   {
    //     rel: "shortcut icon",
    //     url: "/logo.png",
    //   },
    // ],
    other: {
      ["twitter:url"]: `${config.siteMetadata.siteUrl}`,
    },
  };
  return meta;
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const t = useTranslations("metadata");

  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeModeScript mode="dark" />
        <AnalysisScript />
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="no-referrer" />
        <meta property="og:locale" content={locale}></meta>
        <meta itemProp="name" content={config.siteMetadata.applicationName} />
        <meta itemProp="description" content={t("description")} />
        <meta itemProp="image" content={config.siteMetadata.socialBanner} />
      </head>

      <body className={`${inter.className}`}>
        <Flowbite theme={{ mode: "dark" }}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="fixed left-0 top-0 -z-10 h-full w-full">
              <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            </div>
            <NextTopLoader showSpinner={false} color="#E5E7EB" />
            <Header locale={locale} />
            <main>{children}</main>
            <Footer />
            <Suspense>
              <FlowbiteToaster />
            </Suspense>
            <GoogleSignInComponent />
            <WebVitals />
          </NextIntlClientProvider>
        </Flowbite>
      </body>
    </html>
  );
}
