"use client";

import { Link } from "@/components/Link";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) {
  const t = useTranslations("authenticate");
  const router = redirectMethod === "client" ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
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

        <div className="flex items-center justify-start">
          {/* <div className="flex items-start">
            <div className="flex h-5 items-center">
              <Checkbox id="remember-social" required className="dark:ring-0"/>
            </div>
            <div className="ml-3 text-sm">
              <Label
                htmlFor="remember-social"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </Label>
            </div>
          </div> */}
          <Link
            href="/sign-in/forgot_password"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {t("forgetPassword")}
          </Link>
        </div>

        <Button type="submit" className="w-full" isProcessing={isSubmitting}>
          {t("signIn")}
        </Button>
      </form>

      {allowEmail && (
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {t("signIn")}
          &nbsp;
          <Link
            href="/sign-in"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {t("magicLink")}
          </Link>
        </p>
      )}
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {t("dontHaveAccount")}&nbsp;
        <Link
          href="/sign-in/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
