"use client";

import {
  resendOtpCodeEmail,
  signInWithEmailOtp,
  verifyEmailOtp,
} from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";

interface EmailSignInProps {
  redirectMethod: string;
  optSend?: boolean;
  email?: string;
}

export default function EmailOtpSignIn({
  redirectMethod,
  optSend,
  email,
}: EmailSignInProps) {
  const t = useTranslations("authenticate");
  const router_ = useRouter();
  const router = redirectMethod === "client" ? router_ : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpCodeSubmitting, setIsOtpCodeSubmitting] = useState(false);

  const [countdown, setCountdown] = useState(60);

  // 进入这个页面时,如果有optSend，则设置一个60秒的倒计时状态
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (optSend) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [optSend]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithEmailOtp, router);
    setIsSubmitting(false);
  };

  /** 重新发送otp code */
  const handleResendOtp = async () => {
    setCountdown(60);
    if (email) {
      await resendOtpCodeEmail(email);
    }
  };

  /** 校验otp code */
  const handleOtpCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsOtpCodeSubmitting(true);
    await handleRequest(e, verifyEmailOtp, router);
    setIsOtpCodeSubmitting(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="space-y-4 md:space-y-4 mt-2">
      {optSend ? (
        <form
          noValidate={true}
          className="space-y-4 md:space-y-6"
          onSubmit={(e) => handleOtpCodeSubmit(e)}
        >
          <div className="relative">
            <Label htmlFor="email" className="mb-2 block dark:text-white">
              {t("email")}
            </Label>
            {/* 这个用来展示,disabled无法拿到值 */}
            <TextInput
              id="email"
              required
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              defaultValue={email}
              disabled
              className="z-50 relative"
            />
            {/* 表单从这个获取值 */}
            <TextInput
              id="email"
              required
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              defaultValue={email}
              readOnly
              className="opacity-0 absolute top-7 right-0"
            />
          </div>
          <div>
            <Label htmlFor="loginCode" className="mb-2 block dark:text-white">
              {t("loginCode")}
            </Label>
            <div className="flex">
              <TextInput
                id="loginCode"
                required
                type="text"
                name="loginCode"
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                className="flex-1 mr-5"
              />
              <Button
                disabled={countdown !== 0 ? true : false}
                className="tabular-nums"
                onClick={handleResendOtp}
              >
                {countdown !== 0
                  ? t("resendIn", { countdown: countdown })
                  : t("resend")}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isProcessing={isOtpCodeSubmitting}
          >
            {t("signInCode")}
          </Button>
        </form>
      ) : (
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
              name="email"
              required
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>

          <Button type="submit" className="w-full" isProcessing={isSubmitting}>
            {t("signIn")}
          </Button>
        </form>
      )}
    </div>
  );
}
