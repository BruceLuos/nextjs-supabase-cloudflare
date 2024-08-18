"use client";

import { Link } from "@/components/Link";
import { signInWithEmail } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";

// Define prop type with allowPassword boolean
interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton,
}: EmailSignInProps) {
  const t = useTranslations("authenticate");
  const router = redirectMethod === "client" ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithEmail, router);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4 md:space-y-4">
      <form
        noValidate={true}
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <Label htmlFor="email" className="mb-2 block dark:text-white">
            {t("email")}
          </Label>
          <TextInput
            id="email"
            // placeholder="name@company.com"
            required
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          isProcessing={isSubmitting}
          disabled={disableButton}
        >
          {t("signIn")}
        </Button>
      </form>
      {allowPassword && (
        <>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            <Link
              href="/sign-in/password_sign-in"
              className="text-sm text-primary-600 hover:underline dark:text-primary-500"
            >
              {t("signIn")}&nbsp;
            </Link>
            {t("withEmailAndPassword")}
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {t("dontHaveAccount")}&nbsp;
            <Link
              href="/sign-in/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              {t("signUp")}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}