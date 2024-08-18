import { MetadataRoute } from "next";
import { allBlogs } from "contentlayer/generated";
import config from "@/config";
import { locales } from "@/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const env = process.env.NODE_ENV;
  const siteUrl =
    env === "development" ? "localhost:3000/" : config.siteMetadata.siteUrl;

  const blogRoutes = allBlogs.map((post) => ({
    url: `${siteUrl}${post.locale}${post.slug}`.split(".")[0],
    lastModified: post.date,
  }));

  const routes = locales.flatMap((language) =>
    config.sitemap.baseRoutes.map((route) => ({
      url: `${siteUrl}${language === "en" ? "" : language + "/"}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }))
  );

  console.log("blogRoutes", blogRoutes);
  console.log("routes", routes);

  return [...routes, ...blogRoutes];
}
