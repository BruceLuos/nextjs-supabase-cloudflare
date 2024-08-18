"use client";

import { Link, useRouter, usePathname } from "@/navigation";
import { Dropdown, Select } from "flowbite-react";
import { useSearchParams } from "next/navigation";
// import { Link } from "@/components/Link";

export default function LanguageChanger({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  type Locale =
    | "en"
    | "id"
    | "pt"
    | "de"
    | "es"
    | "fr"
    | "it"
    | "vi"
    | "ko"
    | "ja"
    | "zh"
    | "zh-TW";

  const localMap: Record<Locale, string> = {
    en: "English",
    id: "Bahasa Indonesia",
    pt: "Português",
    de: "Deutsch",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    vi: "Tiếng Việt",
    ko: "한국어",
    ja: "日本語",
    zh: "简体中文",
    "zh-TW": "繁体中文",
  };

  const handleClick = (e: any) => {
    const url = params.get("url");
    console.log("pathname", pathname);
    console.log("params", params);
    const finalpath = url ? `${pathname}?url=${url}` : pathname;
    router.push(finalpath, { locale: e });
  };

  const url = params.get("url");
  const finalpath = url ? `${pathname}?url=${url}` : pathname;

  return (
    <Dropdown
      label={localMap[locale as Locale]}
      dismissOnClick={false}
      value={locale}
      inline
      theme={{
        inlineWrapper:
          "inline-flex items-center font-medium justify-center px-1 py-0 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-transparent dark:hover:text-primary-600",
      }}
    >
      <Dropdown.Item onClick={() => handleClick("en")} >
        <Link href={finalpath} locale={"en"}>
          English
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("id")}>
        <Link href={finalpath} locale={"id"}>
          Bahasa Indonesia
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("pt")}>
        <Link href={finalpath} locale={"pt"}>
          Português
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("de")}>
        <Link href={finalpath} locale={"de"}>
          Deutsch
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("es")}>
        <Link href={finalpath} locale={"es"}>
          Español
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("fr")}>
        <Link href={finalpath} locale={"fr"}>
          Français
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("it")}>
        <Link href={finalpath} locale={"it"}>
          Italiano
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("vi")}>
        <Link href={finalpath} locale={"vi"}>
          Tiếng Việt
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("ko")}>
        <Link href={finalpath} locale={"ko"}>
          한국어
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("ja")}>
        <Link href={finalpath} locale={"ja"}>
          日本語
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("zh")}>
        <Link href={finalpath} locale={"zh"}>
          简体中文
        </Link>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick("zh-TW")}>
        <Link href={finalpath} locale={"zh-TW"}>
          繁体中文
        </Link>
      </Dropdown.Item>
    </Dropdown>
  );
}
