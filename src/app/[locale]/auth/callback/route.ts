import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { generateGravatarUrl, getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import { getUserData } from "@/utils/db-operation";

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log("requestUrl", requestUrl);

  if (code) {
    const supabase = createClient();

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    // 给用户设置默认头像
    if (data.user) {
      const userData = await getUserData(data.user.id);
      console.log('userData', userData)
      // 设置默认头像
      if (userData.avatar_url === 'default') {
        const defaultAvatarUrl = await generateGravatarUrl(userData.email!)

        const { error: updateError } = await supabase
          .from('users')
          .update({ avatar_url: defaultAvatarUrl })
          .eq('id', data.user.id);

        if (updateError) {
          return NextResponse.redirect(
            getErrorRedirect(
              `${requestUrl.origin}/sign-in`,
              updateError.message,
              "Sorry, we weren't able to log you in. Please try again."
            )
          );
        }
      }
    }

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/sign-in`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
