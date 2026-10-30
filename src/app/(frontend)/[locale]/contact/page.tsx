import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { ContactForm } from "@/components/ui/ContactForm"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"
import { contacts } from "@/lib/site"

type Props = { params: LocaleParams }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "Contact" })
  return { title: t("title"), description: t("intro") }
}

export default async function ContactPage({ params }: Props) {
  const locale = await enterLocale(params)
  const t = await getTranslations("Contact")

  return (
    <section aria-labelledby="page-title" className="border-b border-line">
      <div className="frame flex flex-wrap gap-14 px-5 pt-12 pb-16 md:px-12 md:pt-24 md:pb-26">
        <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-6">
          <h1
            id="page-title"
            className="animate-rise text-[3.25rem] leading-none font-medium tracking-[-0.045em] md:text-[clamp(3.25rem,7vw,5.5rem)]"
          >
            {t("title")}
          </h1>
          <p className="max-w-[27.5rem] animate-rise text-[1.0625rem] text-soft [animation-delay:0.08s] md:text-[1.1875rem]">
            {t("intro")}
          </p>
          <ul
            aria-label={t("direct")}
            className="mt-4 animate-rise border-t border-line-2 [animation-delay:0.16s]"
          >
            {contacts.map(item => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="group grid min-h-14 grid-cols-[6rem_minmax(0,1fr)_1.5rem] items-center gap-3 border-b border-line px-2 no-underline transition-colors hover:bg-raise"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase">
                    {t(`rows.${item.id}`)}
                  </span>
                  <span className="truncate">{item.short}</span>
                  <span
                    aria-hidden="true"
                    className="text-soft transition-[transform,color] duration-300 ease-soft group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-accent"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-[1_1_28.75rem] animate-rise rounded-[20px] border border-line-2 bg-bg-deep p-5 [animation-delay:0.12s] md:p-9">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  )
}
