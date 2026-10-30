import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import { PageHeader } from "@/components/ui/PageHeader"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"
import { stack } from "@/lib/site"

type Props = { params: LocaleParams }

type Job = { org: string; role: string; period: string; text: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "About" })
  return { title: t("title"), description: t("lede") }
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line">
      <div className="frame grid gap-6 px-5 py-14 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:px-12 md:py-16">
        <h2 className="eyebrow pt-1 text-accent">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export default async function AboutPage({ params }: Props) {
  await enterLocale(params)
  const t = await getTranslations("About")
  const story = t.raw("story") as string[]
  const experience = t.raw("experience") as Job[]
  const groups = Object.keys(stack) as (keyof typeof stack)[]

  return (
    <>
      <PageHeader title={t("title")} lede={t("lede")} />

      <section className="border-b border-line">
        <div className="frame flex flex-col gap-5 px-5 py-14 text-lg text-soft md:px-12 md:py-16">
          {story.map(paragraph => (
            <p key={paragraph} className="max-w-3xl">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <Section title={t("experienceTitle")}>
        <ol className="flex flex-col gap-8">
          {experience.map(job => (
            <li key={job.org} className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">{job.org}</h3>
                <span className="font-mono text-xs text-muted">{job.period}</span>
              </div>
              <p className="text-ink">{job.role}</p>
              <p className="max-w-3xl text-soft">{job.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t("stackTitle")}>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[12rem_minmax(0,1fr)]">
          {groups.map(group => (
            <div key={group} className="contents">
              <dt className="font-medium">{t(`stackGroups.${group}`)}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {stack[group].map(item => (
                    <li
                      key={item}
                      className="inline-flex min-h-7 items-center rounded-md border border-line-2 px-2.5 font-mono text-xs text-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={t("mentoringTitle")}>
        <p className="max-w-3xl text-lg text-soft">{t("mentoring")}</p>
      </Section>
    </>
  )
}
