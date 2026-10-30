import { getTranslations } from "next-intl/server"

import { Hero3D } from "@/components/three/Hero3D"
import { ButtonAnchor, ButtonLink } from "@/components/ui/ButtonLink"
import { ProjectTile } from "@/components/ui/ProjectTile"
import { SectionHead } from "@/components/ui/SectionHead"
import { Link } from "@/i18n/navigation"
import { enterLocale, type LocaleParams } from "@/i18n/params"
import { getPosts, getProjects } from "@/lib/payload"
import { toCard } from "@/lib/projects"
import { contact, marquee, owner } from "@/lib/site"

type Props = { params: LocaleParams }

type Stat = { value: number; suffix: string; label: string }
type Job = { period: string; org: string; role: string }

const STEPS = 3

export default async function HomePage({ params }: Props) {
  const locale = await enterLocale(params)
  const t = await getTranslations("Home")
  const card = await getTranslations("Card")
  const empty = await getTranslations("Projects")
  const [projects, posts] = await Promise.all([getProjects(locale), getPosts(locale)])
  const stats = t.raw("stats") as Stat[]
  const jobs = t.raw("jobs") as Job[]
  const latest = posts[0]

  return (
    <>
      {/* First screen: the galaxy behind the name */}
      <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
        <Hero3D />
        <div className="frame relative flex flex-col justify-center gap-5 px-5 pt-[340px] pb-18 md:min-h-[780px] md:gap-7 md:px-12 md:py-30">
          <p className="eyebrow animate-rise text-[0.6875rem] text-accent md:text-xs">[ {t("eyebrow")} ]</p>
          <h1
            id="hero-title"
            className="max-w-[40rem] text-[2.75rem] leading-[0.98] font-medium tracking-[-0.045em] md:text-[clamp(3rem,7vw,5.75rem)] md:leading-[0.96]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block animate-line-up [animation-delay:0.08s]">{owner.name}</span>
            </span>
            <span className="-mt-[0.06em] block overflow-hidden pb-[0.06em]">
              <span className="block animate-line-up text-accent [animation-delay:0.16s]">{t("role")}</span>
            </span>
          </h1>
          <p className="max-w-[31.25rem] animate-rise text-[1.0625rem] text-soft [animation-delay:0.24s] md:text-[1.1875rem]">
            {t("lede")}
          </p>
          <div className="flex animate-rise flex-col gap-2.5 pt-1 [animation-delay:0.32s] sm:flex-row sm:flex-wrap sm:gap-3">
            <ButtonLink href="/projects" magnetic>
              {t("projectsCta")} <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" magnetic>
              {t("contactCta")}
            </ButtonLink>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4.5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-7"
        >
          <span className="flex h-8 w-5 justify-center rounded-[11px] border-[1.5px] border-muted pt-1.5 md:h-[38px] md:w-6 md:rounded-[13px] md:pt-[7px]">
            <span className="wheel block h-[7px] w-[3px] rounded-[2px] bg-accent md:h-2" />
          </span>
          <span className="hidden font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase md:block">
            {t("scroll")}
          </span>
        </div>
      </section>

      {/* The stack, running in a loop */}
      <section aria-label={t("stackLabel")} className="marquee overflow-hidden border-b border-line">
        <div className="marquee-track flex w-max font-mono text-[0.8125rem] whitespace-nowrap text-soft md:text-sm">
          {[0, 1].map(copy => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex gap-6 py-4 pr-6 md:gap-9 md:py-5 md:pr-9"
            >
              {marquee.map(item => (
                <li key={item} className="flex gap-6 md:gap-9">
                  {item}
                  <span aria-hidden="true" className="text-accent">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Numbers that count up */}
      <section aria-label={t("statsLabel")} className="border-b border-line">
        <div className="frame grid grid-cols-2 md:grid-cols-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              data-reveal=""
              className="flex flex-col gap-1 border-line px-5 py-6 odd:border-r [&:nth-child(-n+2)]:border-b md:gap-1.5 md:border-r md:px-8 md:py-10 md:last:border-r-0 md:[&:nth-child(-n+2)]:border-b-0"
            >
              <span
                data-count={stat.value}
                data-suffix={stat.suffix}
                className="text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-accent md:text-[3.5rem]"
              >
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-sm text-soft md:text-base">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 01 · Projects from the CMS */}
      <section id="projects" aria-labelledby="projects-title" className="border-b border-line">
        <div className="frame flex flex-col gap-7 px-5 py-16 md:gap-12 md:px-12 md:py-26">
          <SectionHead
            id="projects-title"
            eyebrow={t("projectsEyebrow")}
            title={t("projectsTitle")}
            step={{ index: 1, total: STEPS }}
            aside={
              <Link
                href="/projects"
                className="hidden min-h-11 items-center text-soft no-underline transition-colors hover:text-ink md:inline-flex"
              >
                {t("allProjects")} <span aria-hidden="true">&nbsp;→</span>
              </Link>
            }
          />
          {projects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              {projects.map(project => (
                <ProjectTile
                  key={project.id}
                  project={toCard(project)}
                  meta={project.role ?? ""}
                  openLabel={card("open")}
                />
              ))}
            </div>
          ) : (
            <p className="text-soft">{empty("empty")}</p>
          )}
          <ButtonLink href="/projects" variant="ghost" className="md:hidden">
            {t("allProjects")} <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </section>

      {/* 02 · About, in short */}
      <section id="about" aria-labelledby="about-title" className="border-b border-line">
        <div className="frame grid gap-10 px-5 py-16 md:grid-cols-2 md:gap-14 md:px-12 md:py-26">
          <div data-reveal="" className="flex flex-col gap-5">
            <p className="eyebrow">
              [ <span className="text-accent">02</span> / 03 ] · {t("aboutEyebrow")}
            </p>
            <h2
              id="about-title"
              className="text-[2.125rem] leading-[1.05] font-medium tracking-[-0.035em] md:text-[clamp(2.25rem,4vw,3.375rem)] md:leading-[1.04]"
            >
              {t("aboutTitle")}
            </h2>
            <p className="text-soft md:text-lg">{t("aboutText")}</p>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center self-start text-ink no-underline transition-colors hover:text-accent"
            >
              {t("aboutMore")} <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
          <ol aria-label={t("jobsLabel")} className="flex flex-col self-start border-t border-line-2">
            {jobs.map(job => (
              <li
                key={job.org}
                data-reveal=""
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-5 md:grid-cols-[8.75rem_minmax(0,1fr)] md:gap-5"
              >
                <span className="pt-[3px] font-mono text-xs text-muted">{job.period}</span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-medium">{job.org}</span>
                  <span className="text-sm text-soft">{job.role}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The newest blog post, if there is one */}
      {latest && (
        <section aria-label={t("blogEyebrow")} className="border-b border-line">
          <Link
            href={`/blog/${latest.slug}`}
            className="group frame flex flex-col gap-2 px-5 py-8 no-underline transition-colors hover:bg-raise md:flex-row md:items-center md:justify-between md:gap-8 md:px-12"
          >
            <span className="flex flex-col gap-1.5">
              <span className="eyebrow text-accent">{t("blogTitle")}</span>
              <span className="text-xl font-medium tracking-tight md:text-2xl">{latest.title}</span>
            </span>
            <span className="text-soft transition-colors group-hover:text-ink">
              {t("readPost")} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </section>
      )}

      {/* 03 · Call to action */}
      <section aria-labelledby="cta-title" className="border-b border-line">
        <div className="frame dots flex flex-col items-center gap-6 px-5 py-20 text-center md:px-12 md:py-32">
          <p data-reveal="" className="eyebrow text-accent">
            [ 03 / 03 · {t("ctaEyebrow")} ]
          </p>
          <h2
            id="cta-title"
            data-reveal=""
            className="max-w-[47.5rem] text-[2.5rem] leading-[1.02] font-medium tracking-[-0.04em] md:text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            {t("ctaTitle")}
          </h2>
          <p data-reveal="" className="max-w-[32.5rem] text-soft md:text-lg">
            {t("ctaText")}
          </p>
          <div data-reveal="" className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" magnetic>
              {t("contactCta")} <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonAnchor href={contact("telegram").href} magnetic>
              Telegram
            </ButtonAnchor>
            <ButtonAnchor href={contact("email").href} magnetic>
              {contact("email").short}
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  )
}
