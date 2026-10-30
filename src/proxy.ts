import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

// Next.js 16 calls middleware "proxy". This one adds the locale to every
// page URL. The admin panel and the API of Payload stay untouched.
export default createMiddleware(routing)

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
}
