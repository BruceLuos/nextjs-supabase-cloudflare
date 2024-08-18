import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = [
  "en",
  "id",
  "pt",
  "de",
  "es",
  "fr",
  "it",
  "vi",
  "ko",
  "ja",
  "zh",
  "zh-TW",
];

export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
