import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/components/ui/PageHeader"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"
import { contacts } from "@/lib/site"

type Props = { params: LocaleParams }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "Contact" })
  return { title: t("title"), description: t("intro") }
}

// The form that saves messages to Payload comes in stage 5
export default async function ContactPage({ params }: Props) {
  await enterLocale(params)
  const t = await getTranslations("Contact")

  return (
    <>
      <PageHeader title={t("title")} lede={t("intro")} />
      <section className="border-b border-line">
        <div className="frame flex flex-col gap-4 px-5 py-14 md:px-12 md:py-16">
          <h2 className="eyebrow text-accent">{t("direct")}</h2>
          <ul className="flex flex-col">
            {contacts.map(contact => (
              <li key={contact.id}>
                <a
                  href={contact.href}
                  className="inline-flex min-h-11 items-center font-mono text-soft no-underline transition-colors hover:text-ink"
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
