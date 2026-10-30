import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/components/ui/PageHeader"
import { Link } from "@/i18n/navigation"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"
import { getPosts } from "@/lib/payload"
import { formatDate, readingTime } from "@/lib/posts"
import { contact } from "@/lib/site"

type Props = { params: LocaleParams }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "Blog" })
  return { title: t("title"), description: t("intro") }
}

export default async function BlogPage({ params }: Props) {
  const locale = await enterLocale(params)
  const t = await getTranslations("Blog")
  const posts = await getPosts(locale)

  return (
    <>
      <PageHeader title={t("title")} lede={t("intro")} />

      <section aria-label={t("title")} className="border-b border-line">
        <div className="frame px-5 py-10 md:px-12 md:py-14">
          {posts.length > 0 ? (
            <ol className="flex flex-col border-t border-line-2">
              {posts.map(post => (
                <li key={post.id} data-reveal="" className="border-b border-line">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 py-8 no-underline md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
                  >
                    <span className="font-mono text-xs text-muted">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                      {" · "}
                      {t("minRead", { count: readingTime(post) })}
                    </span>
                    <span className="flex flex-col gap-2">
                      <span className="text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                        {post.title}
                      </span>
                      {post.description && <span className="max-w-[40rem] text-soft">{post.description}</span>}
                    </span>
                    <span className="text-soft transition-colors group-hover:text-ink">
                      {t("read")} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-soft">{t("empty")}</p>
          )}

          <div data-reveal="" className="mt-10 flex flex-col gap-2 rounded-2xl border border-dashed border-line-2 p-6 md:mt-12 md:p-8">
            <span className="eyebrow text-accent">{t("nextTitle")}</span>
            <p className="text-soft">
              {t.rich("next", {
                link: chunks => (
                  <a
                    href={contact("linkedin").href}
                    className="text-ink underline decoration-line-4 underline-offset-4 hover:decoration-current"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
