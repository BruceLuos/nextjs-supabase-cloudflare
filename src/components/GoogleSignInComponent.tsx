"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const GoogleSignInComponent = () => {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignInWithGoogle = async (response: any) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
    });
    router.refresh();
    console.log("data", data);
    if (error) {
      console.error("error", error);
    }
  };

  const initFunction = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setIsSignedIn(!!session);
    console.log("session", session);
    if (!session) {
      // @ts-ignore
      window.handleSignInWithGoogle = handleSignInWithGoogle;

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  };

  useEffect(() => {
    initFunction();
  }, []);

  return !isSignedIn ? (
    <div
      id="g_id_onload"
      data-client_id="166818278496-40vejqjq765kht6domp5t1139fjlcngs.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleSignInWithGoogle"
      data-nonce=""
      data-auto_select="true"
      data-itp_support="true"
      data-auto_prompt="true"
      data-use_fedcm_for_prompt="true"
    ></div>
  ) : null;
};

export default GoogleSignInComponent;
