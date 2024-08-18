import React from "react";
import ListLayout from "@/components/ListLayout";
import { locales } from "@/navigation";
import { allBlogs } from "contentlayer/generated";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: { page: string; locale: string };
}
const POSTS_PER_PAGE = 5;

export const runtime = "edge";
export const dynamicParams = false;
// export const runtime = "nodejs";
// export const dynamic = "force-static";

export const generateStaticParams = async () => {
  const paths: PageProps["params"][] = [];

  locales.forEach((locale) => {
    const localePosts = allBlogs.filter((post) => post.locale === locale);
    const totalPages = Math.ceil(localePosts.length / POSTS_PER_PAGE);
    const localePaths = Array.from({ length: totalPages }, (_, i) => ({
      locale: locale,
      page: (i + 1).toString(),
    }));
    paths.push(...localePaths);
  });

  return paths;
};

export default async function Page({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const localePosts = allBlogs.filter((post) => post.locale === params.locale);
  if (!localePosts) return notFound();

  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  const notFoundData = {
    notFoundTitle: t("notFoundTitle"),
    notFoundDescription: t("notFoundDescription"),
    notFoundButtonText: t("notFoundButtonText"),
  };

  const pageNumber = parseInt(params.page as string);
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
