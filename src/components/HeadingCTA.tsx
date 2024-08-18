import { Button } from "flowbite-react";
import { useTranslations } from "next-intl";

export default function HeadingWithCTAButtonSection() {
  const t = useTranslations("index.bottomDescription");
  return (
    <section className="  ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mx-auto flex max-w-screen-sm flex-col items-center text-center">
          <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            {t("title")}
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400 md:text-lg">
            {t("description")}
          </p>
          <Button color="info" href="/" className="w-fit">
            {t("buttonText")}
          </Button>
        </div>
      </div>
    </section>
  );
}
