import { localePrefix, locales } from "./navigation";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { defaultLocale } from "./config";

export default async function middleware(req: NextRequest) {
  // 国际化中间件
  const handleI18nRouting = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale: defaultLocale,
    localeDetection: false, // close locale detection
  });
  const res = handleI18nRouting(req);

  // supabase 登录校验中间件
  const supabaseReq = await updateSession(req, res);

  return supabaseReq;
}

export const config = {
  // 包含（_next、文件扩展名和 api）的 URL不会走中间件
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
