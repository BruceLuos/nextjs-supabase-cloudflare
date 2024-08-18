import { Footer } from "flowbite-react";
import config from "@/config";
interface FooterBaseProps {
  navLink?: any;
  locale?: string;
}

export default function FooterBase({ navLink, locale }: FooterBaseProps) {
  return (
    <Footer className="rounded-none dark:bg-transparent">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center p-4 text-center md:p-8 lg:p-10 [&>div]:w-fit">
        <Footer.Brand
          alt="site logo"
          href={"/"}
          name={config.siteMetadata.applicationName}
          src={config.siteMetadata.siteLogo}
          className="mt-6"
        />
        <Footer.LinkGroup className="mt-6 mb-6 flex flex-wrap items-center justify-center text-base text-gray-900 dark:text-white">
          <Footer.Link href="/" className="mr-4 hover:underline md:mr-6 ">
            {config.siteMetadata.applicationName}
          </Footer.Link>
          <Footer.Link href="/pricing" className="mr-4 hover:underline md:mr-6">
            Pricing
          </Footer.Link>
          <Footer.Link href="/#faq" className="mr-4 hover:underline md:mr-6">
            FAQs
          </Footer.Link>
          <Footer.Link
            href="/terms-of-service"
            className="mr-4 hover:underline md:mr-6"
          >
            Terms of Service
          </Footer.Link>
          <Footer.Link
            href="/privacy-policy"
            className="mr-4 hover:underline md:mr-6 "
          >
            Privacy Policy
          </Footer.Link>
        </Footer.LinkGroup>
        {/* <Footer.Copyright
          by="ai-music-generator™. All Rights Reserved."
          href="https://flowbite.com"
          year={2024}
        /> */}
      </div>
    </Footer>
  );
}
