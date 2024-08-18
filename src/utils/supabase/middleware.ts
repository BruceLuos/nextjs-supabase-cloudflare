import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  return { supabase, response };
};

export const updateSession = async (
  request: NextRequest,
  response: NextResponse
) => {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    // const { supabase, response } = createClient(request);
    // const startTime = Date.now();

    // // This will refresh session if expired - required for Server Components
    // // https://supabase.com/docs/guides/auth/server-side/nextjs
    // await supabase.auth.getUser();
    // const endTime = Date.now();

    // const duration = endTime - startTime;
    // console.log(`中间件获取用户数据耗时：${duration}毫秒`);
    // return response;

    // create a middleware to handle authentication
    const supabase = createMiddlewareClient({ req: request, res: response });
    const startTime = Date.now();
    // await supabase.auth.getUser();
    await supabase.auth.getSession();
    const endTime = Date.now();

    const duration = endTime - startTime;
    console.log('req', request.nextUrl.pathname)
    console.log(`中间件获取用户数据耗时：${duration}毫秒`);
    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
