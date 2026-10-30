import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import { ButtonAnchor } from "@/components/ui/ButtonLink"
import { CodeWindow } from "@/components/ui/CodeWindow"
import { PageHeader } from "@/components/ui/PageHeader"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"

type Props = { params: LocaleParams }

type Step = { mark: string; title: string; text: string }
type Item = { label: string; text: string }
type Job = { org: string; place: string; role: string; period: string; items: Item[] }
type Course = { org: string; program: string; period: string; stack: string }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "About" })
  return { title: t("title"), description: t("lede") }
}

// A labelled row of the resume: the label on the left on wide screens
function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-5 border-t border-line py-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:py-12">
      <h3 data-reveal="" className="eyebrow pt-1 text-accent">
        {title}
      </h3>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

const headingClass =
  "text-[2.125rem] leading-[1.05] font-medium tracking-[-0.035em] md:text-[clamp(2.25rem,4vw,3.375rem)] md:leading-[1.04]"

export default async function AboutPage({ params }: Props) {
  await enterLocale(params)
  const t = await getTranslations("About")
  const story = t.raw("story") as string[]
  const journey = t.raw("journey") as Step[]
  const experience = t.raw("experience") as Job[]
  const other = t.raw("other") as Item[]
  const education = t.raw("education") as Course[]
  const skills = t.raw("skills") as Item[]
  const notes = t.raw("stackNotes") as Item[]

  return (
    <>
      <PageHeader title={t("title")} lede={t("lede")} />

      {/* Story */}
      <section aria-labelledby="story-title" className="border-b border-line">
        <div className="frame grid gap-6 px-5 py-14 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:px-12 md:py-20">
          <h2 id="story-title" data-reveal="" className="eyebrow pt-1 text-accent">
            {t("storyTitle")}
          </h2>
          <div className="flex flex-col gap-5 text-lg text-soft md:text-xl md:leading-[1.55]">
            {story.map(paragraph => (
              <p key={paragraph} data-reveal="" className="max-w-[45rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Journey: from Baul to now */}
      <section aria-labelledby="journey-title" className="border-b border-line">
        <div className="frame flex flex-col gap-10 px-5 py-16 md:gap-12 md:px-12 md:py-24">
          <div data-reveal="" className="flex flex-col gap-4">
            <Eyebrow>{t("journeyEyebrow")}</Eyebrow>
            <h2 id="journey-title" className={headingClass}>
              {t("journeyTitle")}
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {journey.map(step => (
              <li key={step.mark} data-reveal="" className="flex flex-col gap-3 bg-bg p-6 md:p-8">
                <span className="font-mono text-2xl font-medium tracking-tight text-accent md:text-3xl">
                  {step.mark}
                </span>
                <span className="text-lg font-medium">{step.title}</span>
                <span className="text-soft">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" aria-labelledby="resume-title" className="scroll-mt-16 border-b border-line">
        <div className="frame flex flex-col px-5 py-16 md:px-12 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-12">
            <div data-reveal="" className="flex flex-col gap-4">
              <Eyebrow>
                {t("resumeEyebrow")} · {t("resumeUpdated")}
              </Eyebrow>
              <h2 id="resume-title" className={headingClass}>
                {t("resumeTitle")}
              </h2>
            </div>
            <ButtonAnchor href={t("resumePdf")} download variant="accent">
              {t("resumeDownload")} <span aria-hidden="true">↓</span>
            </ButtonAnchor>
          </div>

          <Row title={t("profileTitle")}>
            <p data-reveal="" className="max-w-[45rem] text-lg text-soft">
              {t("profile")}
            </p>
          </Row>

          <Row title={t("experienceTitle")}>
            <ol className="flex flex-col gap-10">
              {experience.map(job => (
                <li key={`${job.org}-${job.role}`} data-reveal="" className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="text-xl font-medium tracking-tight">{job.org}</h4>
                    <span className="font-mono text-xs text-muted">{job.period}</span>
                  </div>
                  <p className="text-ink">
                    {job.role} <span className="text-muted">· {job.place}</span>
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {job.items.map(item => (
                      <li key={item.label} className="max-w-[45rem] text-soft">
                        <span className="text-ink">{item.label}.</span> {item.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Row>

          <Row title={t("otherTitle")}>
            <ul className="flex flex-col gap-2.5">
              {other.map(item => (
                <li key={item.label} data-reveal="" className="max-w-[45rem] text-soft">
                  <span className="text-ink">{item.label}.</span> {item.text}
                </li>
              ))}
            </ul>
          </Row>

          <Row title={t("educationTitle")}>
            <ol className="flex flex-col gap-7">
              {education.map(course => (
                <li key={course.org} data-reveal="" className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="text-lg font-medium tracking-tight">{course.org}</h4>
                    <span className="font-mono text-xs text-muted">{course.period}</span>
                  </div>
                  <p className="text-ink">{course.program}</p>
                  <p className="font-mono text-xs leading-relaxed text-soft">{course.stack}</p>
                </li>
              ))}
            </ol>
          </Row>

          <Row title={t("skillsTitle")}>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-[12rem_minmax(0,1fr)]">
              {skills.map(item => (
                <div key={item.label} className="contents">
                  <dt className="font-medium">{item.label}</dt>
                  <dd className="text-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
          </Row>

          <Row title={t("languagesTitle")}>
            <p data-reveal="" className="text-soft">
              {t("languages")}
            </p>
          </Row>
        </div>
      </section>

      {/* Stack: the code window and three notes */}
      <section aria-labelledby="stack-title" className="border-b border-line">
        <div className="frame grid gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div data-reveal="" className="flex flex-col gap-4">
              <Eyebrow>{t("stackEyebrow")}</Eyebrow>
              <h2 id="stack-title" className={headingClass}>
                {t("stackTitle")}
              </h2>
            </div>
            <dl className="flex flex-col border-t border-line-2">
              {notes.map(note => (
                <div key={note.label} data-reveal="" className="grid gap-1 border-b border-line py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-mono text-xs tracking-[0.08em] text-accent uppercase sm:pt-1">{note.label}</dt>
                  <dd className="text-soft">{note.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-reveal="" className="min-w-0">
            <CodeWindow label={t("stackFiles")} />
          </div>
        </div>
      </section>

      {/* Mentoring */}
      <section aria-labelledby="mentoring-title" className="border-b border-line">
        <div className="frame grid gap-6 px-5 py-14 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 md:px-12 md:py-20">
          <h2 id="mentoring-title" data-reveal="" className="eyebrow pt-1 text-accent">
            {t("mentoringTitle")}
          </h2>
          <p data-reveal="" className="max-w-[45rem] text-lg text-soft md:text-xl md:leading-[1.55]">
            {t("mentoring")}
          </p>
        </div>
      </section>
    </>
  )
}
