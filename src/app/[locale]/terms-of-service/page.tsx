import { genPageMetadata } from "@/app/seo";
import config from "@/config";

export const metadata = genPageMetadata({
  title: "TermsOfService",
  twitter: {
    site: `${config.siteMetadata.siteUrl}terms-of-service`,
  },
  other: {
    ["twitter:url"]: `${config.siteMetadata.siteUrl}terms-of-service`,
  },
});

export default function TermsOfService() {
  return (
    <section className="my-16">
      <div className=" max-w-6xl text-left my-0 mx-auto px-4">
        <div className=" p-7 rounded-2xl bg-gray-100">
          <h1 className=" text-2xl font-semibold">Terms of Service</h1>
          <p className=" mt-6">
            Welcome to nextjs-supabase-cloudflare! These Terms of Service
            ("Terms") govern your use of our websites, products, services, and
            datasets (collectively referred to as the "Services") provided by
            nextjs-supabase-cloudflare. By accessing or using our Services, you
            agree to comply with these Terms. If you do not agree with these
            Terms, please refrain from using our Services.
          </p>

          <h2 className="text-xl font-semibold mt-6">Acceptance of Terms:</h2>
          <p className=" mt-6">
            By accessing or using our Services, you agree to these Terms, which
            constitute a legally binding agreement between you and
            nextjs-supabase-cloudflare. These Terms apply to all users of the
            Services, including visitors, customers, and contributors of
            content.
          </p>

          <h2 className="text-xl font-semibold mt-6">Use of Services:</h2>
          <p className=" mt-6">
            You agree to use our Services only for lawful purposes and in
            accordance with these Terms. You must not use our Services in any
            way that violates applicable laws or regulations, infringes upon the
            rights of others, or interferes with the operation of the Services.
          </p>

          <h2 className="text-xl font-semibold mt-6">User Accounts:</h2>
          <p className=" mt-6">
            Some features of our Services may require you to create a user
            account. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under
            your account. You agree to provide accurate and complete information
            when creating your account and to promptly update any information
            that may change.
          </p>

          <h1 className="text-xl font-semibold mt-6">Intellectual Property:</h1>
          <p className=" mt-6">
            The content, features, and functionality of our Services are owned
            by nextjs-supabase-cloudflare and are protected by copyright,
            trademark, and other intellectual property laws. You may not modify,
            reproduce, distribute, or create derivative works based on our
            Services without our prior written consent.
          </p>

          <h2 className="text-xl font-semibold mt-6">User Content:</h2>
          <p className=" mt-6">
            You may have the opportunity to submit, post, or upload content to
            our Services. By doing so, you grant nextjs-supabase-cloudflare a
            non-exclusive, royalty-free, worldwide license to use, modify,
            reproduce, distribute, and display your content in connection with
            the operation of the Services.
          </p>

          <h2 className="text-xl font-semibold mt-6">Prohibited Conduct:</h2>
          <p className="mt-6">
            You agree not to engage in any conduct that could disrupt, interfere
            with, or harm our Services or other users. Prohibited conduct
            includes, but is not limited to, hacking, phishing, spamming,
            transmitting malware, or engaging in any activity that violates
            these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6">Third-Party Links:</h2>
          <p className="mt-6">
            Our Services may contain links to third-party websites or resources.
            We are not responsible for the content or availability of these
            external sites and do not endorse or warrant the accuracy of any
            information provided by third parties.
          </p>

          <h2 className="text-xl font-semibold mt-6">
            Disclaimer of Warranties:
          </h2>
          <p className="mt-6">
            Our Services are provided on an "as is" and "as available" basis,
            without any warranties of any kind, either express or implied. We do
            not warrant that our Services will be uninterrupted, error-free, or
            free from harmful components.
          </p>
          <h2 className="text-xl font-semibold mt-6">
            Limitation of Liability:
          </h2>
          <p className="mt-6">
            To the fullest extent permitted by law, nextjs-supabase-cloudflare
            and its affiliates shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising out
            of or in any way related to your use of our Services.
          </p>

          <h1 className="text-xl font-semibold mt-6">Indemnification:</h1>
          <p className="mt-6">
            You agree to indemnify, defend, and hold harmless
            nextjs-supabase-cloudflare and its officers, directors, employees,
            and agents from and against any claims, liabilities, damages,
            losses, or expenses arising out of or in connection with your use of
            our Services or any violation of these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6">Changes to Terms:</h2>
          <p className=" mt-6">
            We reserve the right to modify or update these Terms at any time,
            without prior notice. Changes to these Terms will be effective upon
            posting to our website. Your continued use of our Services after the
            posting of revised Terms constitutes your acceptance of such
            changes.
          </p>
          <h2 className="text-xl font-semibold mt-6">Contact Us:</h2>
          <p className=" mt-6">
            If you have any questions or concerns about these Terms, please
            contact us at contact@nextjs-supabase-cloudflare. By using our
            Services, you acknowledge that you have read, understood, and agree
            to be bound by these Terms. Thank you for choosing
            nextjs-supabase-cloudflare!
          </p>
        </div>
      </div>
    </section>
  );
}
