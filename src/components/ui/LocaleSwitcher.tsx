"use client"

import { useLocale, useTranslations } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

// RU | EN | KY. Links to the same page in the other language.
export function LocaleSwitcher() {
  const t = useTranslations("Locale")
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <ul
      aria-label={t("label")}
      className="flex self-center rounded-full border border-line-2 p-[3px] font-mono text-xs"
    >
      {routing.locales.map(item => (
        <li key={item}>
          {item === locale ? (
            <span
              aria-current="true"
              lang={item}
              className="flex min-h-9 items-center rounded-full bg-pressed px-3 text-ink"
            >
              {item.toUpperCase()}
            </span>
          ) : (
            <Link
              href={pathname}
              locale={item}
              hrefLang={item}
              lang={item}
              title={t(item)}
              className="flex min-h-9 items-center rounded-full px-3 text-soft no-underline transition-colors hover:text-ink"
            >
              {item.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
