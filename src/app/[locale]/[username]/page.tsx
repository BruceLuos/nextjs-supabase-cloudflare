import React from "react";
import {
  getAuthUserDataFromSession,
  getUserDataByUsername,
} from "@/utils/db-operation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import config from "@/config";

type Props = {
  params: { username: string; locale: string };
  searchParams?: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params: { locale, username },
}: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const name = username;
  const userName = decodeURIComponent(name);
  const userNameOther = decodeURIComponent(name.split("%40")[1]);

  const meta: Metadata = {
    metadataBase: new URL(`${config.siteMetadata.siteUrl}`),
    title: t("userTitle", { userName: userNameOther }),
    description: t("userDescription", { userName: userNameOther }),
    openGraph: {
      title: t("userTitle", { userName: userNameOther }),
      description: t("userDescription", { userName: userNameOther }),
      url: "./",
      siteName: t("title"),
      type: "website", // article
      images: [config.siteMetadata.socialBanner],
      // locale: "en_US",
    },
    alternates: {
      canonical: `/${locale === "en" ? "" : locale + "/"}${userName}`,
      languages: {
        "x-default": `${config.siteMetadata.siteUrl}${userName}`,
        en: `${config.siteMetadata.siteUrl}${userName}`,
        id: `${config.siteMetadata.siteUrl}id/${userName}`,
        pt: `${config.siteMetadata.siteUrl}pt/${userName}`,
        de: `${config.siteMetadata.siteUrl}de/${userName}`,
        es: `${config.siteMetadata.siteUrl}es/${userName}`,
        fr: `${config.siteMetadata.siteUrl}fr/${userName}`,
        it: `${config.siteMetadata.siteUrl}it/${userName}`,
        vi: `${config.siteMetadata.siteUrl}vi/${userName}`,
        ko: `${config.siteMetadata.siteUrl}ko/${userName}`,
        ja: `${config.siteMetadata.siteUrl}ja/${userName}`,
        zh: `${config.siteMetadata.siteUrl}zh/${userName}`,
        "zh-TW": `${config.siteMetadata.siteUrl}zh-TW/${userName}`,
      },
    },
    twitter: {
      title: t("userTitle", { userName: userNameOther }),
      card: "summary_large_image",
      images: [config.siteMetadata.socialBanner],
      site: `${config.siteMetadata.siteUrl}${
        locale === "en" ? "" : locale + "/"
      }${userName}`,
      description: t("userDescription", { userName: userNameOther }),
    },
    other: {
      ["twitter:url"]: `${config.siteMetadata.siteUrl}${
        locale === "en" ? "" : locale + "/"
      }${userName}`,
    },
  };
  return meta;
}

export default async function ProfilePage({ params, searchParams }: Props) {
  console.log("params", params.username);
  const username = params.username;
  const name = decodeURIComponent(username.split("%40")[1]);
  // 当前登录用户
  const user = await getAuthUserDataFromSession();
  // 当前查看的用户
  const userData = await getUserDataByUsername(name);
  // 判断是否是当前用户
  const isAuthUser = user?.id === userData.id;
  console.log("isAuthUser", isAuthUser);

  return (
    <div>
      {/* 用户信息 */}
      <div className="">
        <div className="mx-auto flex max-w-screen-xl px-2 sm:px-4 xl:px-0 pt-[30px] pb-[37px] xl:gap-0 flex-col md:flex-row items-center md:items-stretch">
          <div className="dark:text-white leading-tight text-6xl font-extrabold self-auto md:self-end flex-none md:flex-1 order-2 md:order-none">
            {userData.username}
          </div>
          <div className="max-w-[230px] w-full flex-none md:flex-1 mb-0 md:mb-[23px] order-1 md:order-none">
            <img
              className="aspect-square object-cover w-full rounded-full "
              src={userData.avatar_url}
              alt="avatar"
            />
          </div>
          <div className="md:ml-8 flex gap-[18px] flex-col flex-none md:flex-1 relative order-3 md:order-none">
            <div className="self-end flex flex-1 justify-end md:absolute md:right-0 md:top-[-9px] gap-5">
              {isAuthUser && (
               userData.name
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
