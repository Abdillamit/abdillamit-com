import { RichText } from "@payloadcms/richtext-lexical/react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Peaks } from "@/components/ui/Peaks"
import { Link } from "@/i18n/navigation"
import { readLocale } from "@/i18n/params"
import { getPost, getSlugs } from "@/lib/payload"
import { formatDate, readingTime } from "@/lib/posts"
import { toImage } from "@/lib/projects"
import { owner } from "@/lib/site"

type Params = Promise<{ locale: string; slug: string }>
type Props = { params: Params }

export async function generateStaticParams() {
  try {
    return (await getSlugs("posts")).map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const { slug } = await params
  const post = await getPost(slug, locale)
  if (!post) return {}
  const og = toImage(post.cover, "og")
  return {
    title: post.title,
    description: post.description ?? undefined,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      images: og ? [{ url: og.url, width: og.width, height: og.height }] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const locale = await readLocale(params)
  const { slug } = await params
  setRequestLocale(locale)

  const post = await getPost(slug, locale)
  if (!post) notFound()

  const t = await getTranslations("Blog")
  const about = await getTranslations("Home")

  return (
    <article>
      <header className="border-b border-line">
        <div className="frame flex flex-col gap-5 px-5 pt-8 pb-12 md:px-12 md:pt-16 md:pb-16">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center self-start font-mono text-[0.8125rem] text-soft no-underline transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←&nbsp;</span>
            {t("back")}
          </Link>
          <p className="eyebrow animate-rise">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            {" · "}
            {t("minRead", { count: readingTime(post) })}
          </p>
          <h1 className="max-w-[50rem] animate-rise text-[2.5rem] leading-[1.02] font-medium tracking-[-0.04em] [animation-delay:0.08s] md:text-[clamp(2.75rem,6vw,4.5rem)]">
            {post.title}
          </h1>
          {post.description && (
            <p className="max-w-[40rem] animate-rise text-lg text-soft [animation-delay:0.16s] md:text-xl">
              {post.description}
            </p>
          )}
        </div>
      </header>

      <div className="border-b border-line">
        <div className="frame px-5 py-12 md:px-12 md:py-20">
          {post.content && (
            <RichText data={post.content} className="prose-site mx-auto max-w-[42.5rem]" />
          )}

          <aside
            aria-label={t("aboutAuthor")}
            className="mx-auto mt-16 flex max-w-[42.5rem] gap-4 rounded-2xl border border-line-2 bg-bg-deep p-6"
          >
            <span className="mt-1 text-accent">
              <Peaks size={28} />
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="font-medium">{owner.name}</span>
              <span className="text-sm text-soft">{about("lede")}</span>
              <Link
                href="/about"
                className="inline-flex min-h-9 items-center self-start text-sm text-ink no-underline hover:text-accent"
              >
                {about("aboutMore")} <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </span>
          </aside>
        </div>
      </div>
    </article>
  )
}
