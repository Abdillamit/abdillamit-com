"use client"

import { useLocale, useTranslations } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

// RU | EN | KY in the header; full names in the mobile menu. Each one
// links to the same page in that language.
export function LocaleSwitcher({ variant = "pill" }: { variant?: "pill" | "menu" }) {
  const t = useTranslations("Locale")
  const locale = useLocale()
  const pathname = usePathname()
  const menu = variant === "menu"

  const item = menu
    ? "flex min-h-11 items-center justify-center rounded-full"
    : "flex min-h-9 items-center rounded-full px-3"

  return (
    <ul
      aria-label={t("label")}
      className={`rounded-full border border-line-2 font-mono ${
        menu ? "grid grid-cols-3 p-1 text-[0.8125rem]" : "flex p-[3px] text-xs"
      }`}
    >
      {routing.locales.map(code => (
        <li key={code}>
          {code === locale ? (
            <span aria-current="true" lang={code} className={`${item} bg-pressed text-ink`}>
              {menu ? t(code) : code.toUpperCase()}
            </span>
          ) : (
            <Link
              href={pathname}
              locale={code}
              hrefLang={code}
              lang={code}
              title={menu ? undefined : t(code)}
              className={`${item} text-soft no-underline transition-colors hover:text-ink`}
            >
              {menu ? t(code) : code.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
