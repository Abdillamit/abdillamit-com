import { RichText } from "@payloadcms/richtext-lexical/react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import { ProjectCover } from "@/components/ui/ProjectCover"
import { Link } from "@/i18n/navigation"
import { readLocale } from "@/i18n/params"
import { getProject, getProjects, getSlugs } from "@/lib/payload"
import { toImage } from "@/lib/projects"

type Params = Promise<{ locale: string; slug: string }>
type Props = { params: Params }

export async function generateStaticParams() {
  try {
    return (await getSlugs("projects")).map(({ slug }) => ({ slug }))
  } catch {
    // No database while building (e.g. a CI lint run): render on request
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const { slug } = await params
  const project = await getProject(slug, locale)
  if (!project) return {}
  const og = toImage(project.cover, "og")
  return {
    title: project.title,
    description: project.summary,
    openGraph: og ? { images: [{ url: og.url, width: og.width, height: og.height }] } : undefined,
  }
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-b border-line">
      <div className="frame flex flex-wrap gap-x-16 gap-y-6 px-5 py-14 md:px-12 md:py-22">
        <h2
          id={id}
          data-reveal=""
          className="flex-[1_1_13.75rem] font-mono text-[0.8125rem] font-normal tracking-[0.08em] text-accent uppercase"
        >
          {title}
        </h2>
        <div className="min-w-0 flex-[3_1_35rem]">{children}</div>
      </div>
    </section>
  )
}

const two = (value: number) => String(value).padStart(2, "0")

export default async function ProjectPage({ params }: Props) {
  const locale = await readLocale(params)
  const { slug } = await params
  setRequestLocale(locale)

  const [project, all] = await Promise.all([getProject(slug, locale), getProjects(locale)])
  if (!project) notFound()

  const t = await getTranslations("Project")
  const index = all.findIndex(item => item.id === project.id)
  const next = all.length > 1 ? all[(index + 1) % all.length] : null
  const cover = toImage(project.cover, "wide")
  const gallery = (project.gallery ?? [])
    .map(item => ({ id: item.id, image: toImage(item.image, "card"), caption: item.caption }))
    .filter(item => item.image)
  const highlights = project.highlights ?? []
  const layers = project.layers ?? []
  const links = project.links ?? []
  const eyebrow = [project.kind, project.company].filter(Boolean).join(" · ")

  return (
    <article>
      <header className="border-b border-line">
        <div className="frame flex flex-col gap-5 px-5 pt-8 pb-12 md:gap-5.5 md:px-12 md:pt-16 md:pb-14">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center self-start font-mono text-[0.8125rem] text-soft no-underline transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←&nbsp;</span>
            {t("back")}
          </Link>
          {eyebrow && <p className="eyebrow animate-rise text-accent">{eyebrow}</p>}
          <h1 className="animate-rise text-[clamp(3.5rem,10vw,8.75rem)] leading-[0.9] font-medium tracking-[-0.055em] [animation-delay:0.08s]">
            {project.title}
          </h1>
          <p className="max-w-[40rem] animate-rise text-lg text-soft [animation-delay:0.16s] md:text-[1.3125rem]">
            {project.tagline || project.summary}
          </p>
        </div>
      </header>

      <section aria-label={t("facts")} className="border-b border-line">
        <dl className="frame grid sm:grid-cols-2 lg:grid-cols-4">
          {project.role && (
            <div data-reveal="" className="flex flex-col gap-2 border-b border-line px-5 py-6 sm:border-r md:px-8 md:py-7 lg:border-b-0">
              <dt className="eyebrow text-[0.6875rem]">{t("role")}</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          {project.period && (
            <div data-reveal="" className="flex flex-col gap-2 border-b border-line px-5 py-6 md:px-8 md:py-7 lg:border-r lg:border-b-0">
              <dt className="eyebrow text-[0.6875rem]">{t("period")}</dt>
              <dd>{project.period}</dd>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div data-reveal="" className="flex flex-col gap-2 border-b border-line px-5 py-6 sm:border-r sm:border-b-0 md:px-8 md:py-7">
              <dt className="eyebrow text-[0.6875rem]">{t("stack")}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.stack.map(item => (
                  <span key={item} className="chip text-xs">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {links.length > 0 && (
            <div data-reveal="" className="flex flex-col gap-2 px-5 py-6 md:px-8 md:py-7">
              <dt className="eyebrow text-[0.6875rem]">{t("links")}</dt>
              {links.map(item => (
                <dd key={item.id ?? item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-8 items-center text-accent no-underline hover:text-ink"
                  >
                    {item.label} <span aria-hidden="true">&nbsp;↗</span>
                  </a>
                </dd>
              ))}
            </div>
          )}
        </dl>
      </section>

      <section aria-label={t("cover")} className="border-b border-line">
        <div className="frame p-5 md:p-12">
          <div data-reveal="">
            <ProjectCover
              title={project.title}
              tone={project.tone ?? "amber"}
              image={cover}
              sizes="(min-width: 1200px) 1100px, 100vw"
              priority
              className="h-60 rounded-2xl border border-line-2 sm:h-96 md:h-[35rem] md:rounded-[20px]"
            />
          </div>
        </div>
      </section>

      {project.intro && (
        <Block id="what-title" title={t("what")}>
          <p data-reveal="" className="text-xl leading-[1.45] tracking-[-0.01em] md:text-2xl">
            {project.intro}
          </p>
        </Block>
      )}

      {highlights.length > 0 && (
        <Block id="did-title" title={t("did")}>
          <ol className="flex flex-col border-t border-line-2">
            {highlights.map((item, position) => (
              <li
                key={item.id ?? item.title}
                data-reveal=""
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-line py-6 md:grid-cols-[3.5rem_minmax(0,1fr)]"
              >
                <span className="pt-1 font-mono text-[0.8125rem] text-muted">{two(position + 1)}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-lg font-medium md:text-xl">{item.title}</span>
                  <span className="text-soft">{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {layers.length > 0 && (
        <Block id="how-title" title={t("how")}>
          <ol className="flex flex-col gap-3">
            {layers.map(layer => (
              <li
                key={layer.id ?? layer.tag}
                data-reveal=""
                className="relative grid grid-cols-[5.25rem_minmax(0,1fr)] items-center gap-4 rounded-xl border border-line-2 bg-bg-deep px-4 py-4 md:grid-cols-[6.25rem_minmax(0,1fr)] md:px-5"
              >
                <span className="justify-self-start rounded-md border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-accent">
                  {layer.tag}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-medium">{layer.title}</span>
                  {layer.sub && <span className="font-mono text-xs text-muted">{layer.sub}</span>}
                </span>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {project.description && (
        <Block id="more-title" title={t("more")}>
          <RichText data={project.description} className="prose-site max-w-[45rem]" />
        </Block>
      )}

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="border-b border-line">
          <div className="frame flex flex-col gap-8 px-5 py-14 md:px-12 md:py-22">
            <h2
              id="gallery-title"
              data-reveal=""
              className="font-mono text-[0.8125rem] font-normal tracking-[0.08em] text-accent uppercase"
            >
              {t("gallery")}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map(item =>
                item.image ? (
                  <figure key={item.id ?? item.image.url} data-reveal="" className="flex flex-col gap-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-line-2 bg-bg-deep">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {item.caption && <figcaption className="text-sm text-soft">{item.caption}</figcaption>}
                  </figure>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {next && (
        <Link href={`/projects/${next.slug}`} className="group block border-b border-line no-underline">
          <span className="frame flex flex-wrap items-end justify-between gap-6 px-5 py-16 md:px-12 md:py-24">
            <span className="flex flex-col gap-3">
              <span className="eyebrow">{t("next")}</span>
              <span className="text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.05em] transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-5xl leading-none text-accent transition-transform duration-500 ease-soft group-hover:translate-x-2.5 md:text-6xl"
            >
              →
            </span>
          </span>
        </Link>
      )}
    </article>
  )
}
