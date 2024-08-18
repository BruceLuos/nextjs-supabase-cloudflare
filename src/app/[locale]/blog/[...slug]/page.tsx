import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";

import { Metadata } from "next";
import dynamic from 'next/dynamic'
const Mdx = dynamic(() => import('@/components/MdxComponent'))

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { siteMetadata } from "@/config";

interface PostProps {
  params: {
    slug: string[];
    locale: string;
  };
}

export const runtime = "edge";
export const dynamicParams = false;
// export const runtime = "nodejs";
// export const dynamic = "force-static";

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join(`/`) + `.${params.locale}`;
  const post = allBlogs.find((post) => post.slugAsParams === slug);
  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata",
  });
  const metadata: Metadata = {
    metadataBase: new URL(`${siteMetadata.siteUrl}`),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: "./",
      siteName: t("title"),
      images: [siteMetadata.socialBanner],
      // locale: "en_US",
      type: "website", // article
    },
    alternates: {
      canonical: "./",
      languages: {
        "x-default": `${siteMetadata.siteUrl}blog/${params.slug}`,
        en: `${siteMetadata.siteUrl}blog/${params.slug}`,
        id: `${siteMetadata.siteUrl}id/blog/${params.slug}`,
        pt: `${siteMetadata.siteUrl}pt/blog/${params.slug}`,
        de: `${siteMetadata.siteUrl}de/blog/${params.slug}`,
        es: `${siteMetadata.siteUrl}es/blog/${params.slug}`,
        fr: `${siteMetadata.siteUrl}fr/blog/${params.slug}`,
        it: `${siteMetadata.siteUrl}it/blog/${params.slug}`,
        vi: `${siteMetadata.siteUrl}vi/blog/${params.slug}`,
        ko: `${siteMetadata.siteUrl}ko/blog/${params.slug}`,
        ja: `${siteMetadata.siteUrl}ja/blog/${params.slug}`,
      },
    },
    twitter: {
      title: post.title,
      card: "summary_large_image",
      images: [siteMetadata.socialBanner],
      site: `${siteMetadata.siteUrl}${params.locale}/blog/${params.slug}`,
      description: post.description,
    },
    other: {
      ["twitter:url"]: `${siteMetadata.siteUrl}${params.locale}/blog/${params.slug}`,
    },
  };
  return metadata;
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const data = allBlogs.map((post) => ({
    slug: post.slugAsParams.split("/"),
    locale: post.locale,
  }));
  return data;
}

export default async function PostPage({ params }: PostProps) {
  unstable_setRequestLocale(params.locale!);

  const post = await getPostFromParams(params);
  console.log('post',post)
  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert mx-auto mt-6 max-w-3xl px-5">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      {/* 使用react-markdown时用这个 */}
      {/* <Mdx code={post.body.raw} /> */}
      {/* 直接使用markdown html的用这个 */}
      <Mdx code={post.body.html} />
    </article>
  );
}
