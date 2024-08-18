import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const meta: Metadata = {
    title: t("notFoundTitle"),
  };
  return meta;
}

export default function NotFoundCatchAll() {
  notFound();
}
