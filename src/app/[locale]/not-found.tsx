import { Button } from "flowbite-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="bg-white dark:bg-gray-900 h-[100vh]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 h-full flex justify-center items-center">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t("title")}
          </p>
          <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
            {t("description")}
          </p>
          <Button color="info" className="my-4 inline-flex" href="/">
            {t("buttonText")}
          </Button>
        </div>
      </div>
    </section>
  );
}
