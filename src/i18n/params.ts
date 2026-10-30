import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { routing, type Locale } from "./routing"

export type LocaleParams = Promise<{ locale: string }>

// For pages and layouts: checks the locale from the URL, enables static
// rendering for it and returns it typed. Unknown locales get a 404.
export async function enterLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  return locale
}

// For generateMetadata: the same check without side effects
export async function readLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
}
