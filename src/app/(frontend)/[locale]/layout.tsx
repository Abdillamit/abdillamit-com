import type { Metadata } from "next"
import { JetBrains_Mono, Onest } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import { MotionRoot } from "@/components/motion/MotionRoot"
import { PageTransition } from "@/components/motion/PageTransition"
import { TerminalProvider } from "@/components/terminal/TerminalProvider"
import { Footer } from "@/components/ui/Footer"
import { Header } from "@/components/ui/Header"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"
import { routing } from "@/i18n/routing"
import { siteUrl } from "@/lib/site"

import "../globals.css"

const onest = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-onest",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
})

type Props = {
  children: ReactNode
  params: LocaleParams
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: `%s — Abdillamit Mamytov` },
    description: t("description"),
    icons: { icon: "/favicon.svg" },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await enterLocale(params)
  const t = await getTranslations("Nav")

  return (
    <html lang={locale} className={`${onest.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <MotionRoot>
            <TerminalProvider>
              <Header />
              <main id="content" className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </TerminalProvider>
          </MotionRoot>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
