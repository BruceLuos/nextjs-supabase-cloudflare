import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from "@/utils/auth-helpers/settings";

import PasswordSignIn from "@/components/ui/AuthForms/PasswordSignIn";
import Separator from "@/components/ui/AuthForms/Separator";
import OauthSignIn from "@/components/ui/AuthForms/OauthSignIn";
import ForgotPassword from "@/components/ui/AuthForms/ForgotPassword";
import UpdatePassword from "@/components/ui/AuthForms/UpdatePassword";
import SignUp from "@/components/ui/AuthForms/Signup";
import { Card } from "flowbite-react";
import { getTranslations } from "next-intl/server";
import EmailOtpSignIn from "@/components/ui/AuthForms/EmailOtpSignIn";

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string; locale: string };
  searchParams: { disable_button: boolean; opt_send: boolean; email: string };
}) {
  console.log("searchParams", searchParams);

  const t = await getTranslations({
    locale: params.locale,
    namespace: "authenticate",
  });
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get("preferredSignInView")?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView); // 默认email_sign-in
    // return redirect(`/sign-in/${viewProp}`);
  }

  // 检查用户是否已登录，如果已登录，则重定向到首页
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password") {
    return redirect("/");
  } else if (!user && viewProp === "update_password") {
    return redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-screen-xl w-full flex flex-col items-center justify-center px-4 py-8 lg:py-0 h-screen md:h-auto md:my-[180px]">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-lg md:mt-0 xl:p-0">
        <Card className="shadow-none">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            {viewProp === "forgot_password"
              ? t("resetPasswordTitle")
              : viewProp === "update_password"
              ? t("updatePasswordTitle")
              : viewProp === "signup"
              ? t("signUpTitle")
              : t("signInTitle")}
          </h1>
          <div className="">
            {viewProp !== "update_password" &&
              viewProp !== "signup" &&
              allowOauth && (
                <>
                  <OauthSignIn />
                  <Separator text="or" />
                </>
              )}
            {viewProp === "password_sign-in" && (
              <PasswordSignIn
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
              />
            )}

            {viewProp === "email_sign-in" && (
              <EmailOtpSignIn
                redirectMethod={redirectMethod}
                optSend={searchParams.opt_send}
                email={searchParams.email}
              />
            )}

            {viewProp === "forgot_password" && (
              <ForgotPassword
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
                disableButton={searchParams.disable_button}
              />
            )}

            {viewProp === "update_password" && (
              <UpdatePassword redirectMethod={redirectMethod} />
            )}
            {viewProp === "signup" && (
              <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
