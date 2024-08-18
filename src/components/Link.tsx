import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as IntlLink } from "@/navigation";
import { useLocale } from "next-intl";
import React from "react";

const DEFAULT_LOCALE = "en";

type LinkProps = {
  locale?: string;
  children: React.ReactNode;
  className?: string;
} & NextLinkProps;

/** 根据当前的语言环境来决定使用哪种类型的链接组件 */
export const Link = ({
  locale = "en",
  children,
  className,
  ...props
}: LinkProps) => {
  const currentLocale = useLocale();
  const isDefaultLocale = currentLocale === DEFAULT_LOCALE;
  // const useNextLink = !isDefaultLocale && locale === DEFAULT_LOCALE;
  const useNextLink = isDefaultLocale;
  const NextIntlLink = useNextLink ? NextLink : IntlLink;
  return (
    <NextIntlLink className={className} {...props}>
      {children}
    </NextIntlLink>
  );
};
