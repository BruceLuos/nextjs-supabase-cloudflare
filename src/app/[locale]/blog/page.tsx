import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ListLayout from "@/components/ListLayout";
import { locales } from "@/navigation";
import { siteMetadata } from "@/config";
interface PageProps {
  params: {
    locale: string;
  };
}

export const dynamicParams = false;
export const runtime = "edge";
// export const dynamic = "force-static";

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const meta: Metadata = {
    metadataBase: new URL(`${siteMetadata.siteUrl}`),
    title: t("blogTitle"),
    description: t("description"),
    openGraph: {
      title: t("blogTitle"),
      description: t("description"),
      url: "./",
      siteName: t("title"),
      images: [siteMetadata.socialBanner],
      // locale: "en_US",
      type: "website", // article
    },
    alternates: {
      canonical: "./",
      languages: {
        "x-default": `${siteMetadata.siteUrl}blog`,
        en: `${siteMetadata.siteUrl}blog`,
        id: `${siteMetadata.siteUrl}id/blog`,
        pt: `${siteMetadata.siteUrl}pt/blog`,
        de: `${siteMetadata.siteUrl}de/blog`,
        es: `${siteMetadata.siteUrl}es/blog`,
        fr: `${siteMetadata.siteUrl}fr/blog`,
        it: `${siteMetadata.siteUrl}it/blog`,
        vi: `${siteMetadata.siteUrl}vi/blog`,
        ko: `${siteMetadata.siteUrl}ko/blog`,
        ja: `${siteMetadata.siteUrl}ja/blog`,
      },
    },
    twitter: {
      title: t("blogTitle"),
      card: "summary_large_image",
      images: [siteMetadata.socialBanner],
      site: `${siteMetadata.siteUrl}${locale}/blog`,
      description: t("description"),
    },
    other: {
      ["twitter:url"]: `${siteMetadata.siteUrl}${locale}/blog`,
    },
  };
  return meta;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 每页post个数
const POSTS_PER_PAGE = 5;

export default async function BlogPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const localePosts = allBlogs.filter((post) => post.locale === params.locale);
  if (!localePosts) return notFound();

  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  const notFoundData = {
    notFoundTitle: t("notFoundTitle"),
    notFoundDescription: t("notFoundDescription"),
    notFoundButtonText: t("notFoundButtonText"),
  };

  const pageNumber = 1;
  const initialDisplayPosts = localePosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(localePosts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout
      notFoundData={notFoundData}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
    />
  );
}
