"use client";

import React from "react";
import { Link } from "@/components/Link";
import { signUp } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const t = useTranslations("authenticate");
  const router_ = useRouter();
  const router = redirectMethod === "client" ? router_ : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
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
            name="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>
        <div>
          <Label htmlFor="password" className="mb-2 block dark:text-white">
            {t("password")}
          </Label>
          <TextInput
            id="password"
            // placeholder="••••••••"
            required
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" isProcessing={isSubmitting}>
          {t("signUp")}
        </Button>
      </form>
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {t("alreadyHaveAccount")}
      </p>
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        <Link
          href="/sign-in/password_sign-in"
          className="text-sm text-primary-600 hover:underline dark:text-primary-500"
        >
          {t("signIn")}&nbsp;
        </Link>
        {t("withEmailAndPassword")}
      </p>
      {allowEmail && (
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {t("signIn")}&nbsp;
          <Link
            href="/sign-in"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {t("magicLink")}
          </Link>
        </p>
      )}
    </div>
  );
}
