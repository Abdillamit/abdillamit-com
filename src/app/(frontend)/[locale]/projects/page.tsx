import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { ProjectsView } from "@/components/ui/ProjectsView"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"
import { getProjects } from "@/lib/payload"
import { toCard } from "@/lib/projects"

type Props = { params: LocaleParams }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "Projects" })
  return { title: t("title"), description: t("intro") }
}

export default async function ProjectsPage({ params }: Props) {
  const locale = await enterLocale(params)
  const t = await getTranslations("Projects")
  const card = await getTranslations("Card")
  const projects = (await getProjects(locale)).map(toCard)

  return (
    <>
      <header className="border-b border-line">
        <div className="frame flex flex-col gap-4 px-5 pt-16 pb-12 md:gap-5 md:px-12 md:pt-24 md:pb-16">
          <h1 className="animate-rise text-[3.25rem] leading-none font-medium tracking-[-0.045em] md:text-[clamp(3.25rem,7vw,5.5rem)]">
            {t("title")}{" "}
            <sup className="align-super font-mono text-base font-normal tracking-normal text-accent md:text-xl">
              {String(projects.length).padStart(2, "0")}
            </sup>
          </h1>
          <p className="max-w-[40rem] animate-rise text-soft [animation-delay:0.08s] md:text-lg">{t("intro")}</p>
        </div>
      </header>

      <section aria-label={t("title")} className="border-b border-line">
        <div className="frame px-5 py-10 md:px-12 md:py-16">
          {projects.length > 0 ? (
            <ProjectsView
              projects={projects}
              labels={{ view: t("view"), cards: t("cards"), list: t("list"), open: card("open") }}
            />
          ) : (
            <p className="text-soft">{t("empty")}</p>
          )}
        </div>
      </section>
    </>
  )
}
