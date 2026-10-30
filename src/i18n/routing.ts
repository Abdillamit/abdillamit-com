import { defineRouting } from "next-intl/routing"

// Every page lives under /ru, /en or /ky. "/" picks the visitor's
// browser language and falls back to Russian, like the old Astro site.
export const routing = defineRouting({
  locales: ["ru", "en", "ky"],
  defaultLocale: "ru",
  localePrefix: "always",
})

export type Locale = (typeof routing.locales)[number]

// For <html lang>, hreflang and date formatting
export const localeTags: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en-US",
  ky: "ky-KG",
}
