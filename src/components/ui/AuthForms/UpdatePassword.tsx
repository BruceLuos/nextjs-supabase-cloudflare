"use client";

import { updatePassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const t = useTranslations("authenticate");
  const router = redirectMethod === "client" ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, router);
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
          <Label htmlFor="password" className="mb-2 block dark:text-white">
            {t("newPassword")}
          </Label>
          <TextInput
            id="password"
            name="password"
            // placeholder="Password"
            required
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
          />
        </div>
        <div>
          <Label
            htmlFor="passwordConfirm"
            className="mb-2 block dark:text-white"
          >
            {t("confirmNewPassword")}
          </Label>
          <TextInput
            id="passwordConfirm"
            name="passwordConfirm"
            // placeholder="Password"
            required
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
          />
        </div>
        <Button type="submit" className="w-full" isProcessing={isSubmitting}>
          {t("updatePassword")}
        </Button>
      </form>
    </div>
  );
}
