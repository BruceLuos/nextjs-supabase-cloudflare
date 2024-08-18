import { Metadata } from "next";
import config from "@/config"

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | ${config.siteMetadata.title}`,
      description: description || config.siteMetadata.description,
      url: "./",
      siteName: config.siteMetadata.title,
      // 如果将 opengraph-image.(jpg|jpeg|png|gif) 图片添加到 /app 文件夹中，则不需要以下代码
      images: image ? [image] : [config.siteMetadata.socialBanner],
      // locale: "en_US",
      type: "website",
    },
    twitter: {
      title: `${title} | ${config.siteMetadata.title}`,
      card: "summary_large_image",
      // 如果将 twitter-image.(jpg|jpeg|png|gif) 图片添加到 /app 文件夹中，则不需要以下代码
      images: image ? [image] : [config.siteMetadata.socialBanner],
    },
    ...rest,
  };
}
