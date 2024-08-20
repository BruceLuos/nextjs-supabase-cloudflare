import { genPageMetadata } from "@/app/seo";
import config from "@/config";

export const metadata = genPageMetadata({
  title: "PrivacyPolicy",
  twitter: {
    site: `${config.siteMetadata.siteUrl}privacy-policy`,
  },
  other: {
    ["twitter:url"]: `${config.siteMetadata.siteUrl}privacy-policy`,
  },
});
export default function PrivacyPolicy() {
  return (
    <section className="my-16">
      <div className=" max-w-6xl text-left my-0 mx-auto px-4">
        <div className=" p-7 rounded-2xl bg-gray-100">
          <h1 className=" text-2xl font-semibold">Privacy Policy</h1>
          <p className=" mt-6">
            At nextjs-supabase-cloudflare, protecting your privacy and adhering
            to applicable laws is our priority. This notice outlines how we
            collect, use, share, store, and secure your information when you
            interact with our services.
          </p>
          <h2 className="text-xl font-semibold mt-6">
            Information Collection:
          </h2>
          <p className=" mt-6">
            We collect information when you provide it directly to us, use our
            services, or when other sources provide it. This includes Contact
            Information, User Account Information, and User Activity
            Information.
          </p>
          <h2 className="text-xl font-semibold mt-6">Information Usage:</h2>
          <p className=" mt-6">
            We use collected information to provide, communicate, market, and
            secure our services. This includes providing support, sending
            notifications, personalizing offerings, and ensuring legal
            compliance.
          </p>
          <h1 className="text-xl font-semibold mt-6">Cookie Usage:</h1>
          <p className=" mt-6">
            We utilize cookies to collect User Activity Information, improving
            user experience and interactions. You can manage cookie preferences
            through your browser settings.
          </p>
          <h2 className="text-xl font-semibold mt-6">Information Sharing:</h2>
          <p className=" mt-6">
            We may share information with other users, service providers, or
            with your consent. We also share information for legal compliance or
            in the context of business activities.
          </p>
          <h2 className="text-xl font-semibold mt-6">Information Security:</h2>
          <p className=" mt-6">
            We maintain security measures to protect your information, though no
            method is entirely foolproof. You are responsible for safeguarding
            your password and devices.
          </p>

          <h2 className="text-xl font-semibold mt-6">
            Opt-Out and Data Management:
          </h2>
          <p className=" mt-6">
            You can opt-out of communications, update your information, or
            request deletion by contacting us. However, certain information may
            be retained for legal or contractual reasons.
          </p>
          <h2 className="text-xl font-semibold mt-6">Payment Processing:</h2>
          <p className=" mt-6">
            We utilize third-party payment processors, and their privacy
            policies apply to information provided during transactions.
          </p>
          <h2 className="text-xl font-semibold mt-6">EEA Residents' Rights:</h2>
          <p className=" mt-6">
            Residents of the European Economic Area have rights regarding
            personal data processing, including access to information and data
            portability.
          </p>
          <h2 className="text-xl font-semibold mt-6">
            Other Important Information:
          </h2>
          <p className=" mt-6">
            We act as a data processor in certain circumstances, and our
            services are not intended for individuals under 18. Our Privacy
            Notice may change, and we encourage regular review for updates.
          </p>
          <h2 className="text-xl font-semibold mt-6">Contact:</h2>
          <p className=" mt-6">
            For questions or concerns about this notice, please contact us at
            contact@nextjs-supabase-cloudflare.
          </p>
        </div>
      </div>
    </section>
  );
}
