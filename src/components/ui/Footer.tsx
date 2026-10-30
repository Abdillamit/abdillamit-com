import { getTranslations } from "next-intl/server"

import { TerminalButton } from "@/components/terminal/TerminalButton"
import { Link } from "@/i18n/navigation"
import { claudeCodeUrl, contacts, owner, sourceUrl } from "@/lib/site"

import { Peaks } from "./Peaks"

const linkClass =
  "inline-flex min-h-9 items-center text-[0.95rem] text-soft no-underline transition-colors hover:text-ink"

const inlineLink =
  "text-ink underline decoration-line-4 underline-offset-4 hover:decoration-current"

export async function Footer() {
  const t = await getTranslations("Footer")
  const nav = await getTranslations("Nav")
  const year = new Date().getFullYear()

  const pages = [
    { href: "/", label: nav("home") },
    { href: "/projects", label: nav("projects") },
    { href: "/about", label: nav("about") },
    { href: "/blog", label: nav("blog") },
    { href: "/contact", label: nav("contact") },
  ]

  return (
    <footer className="border-t border-line">
      <div className="frame flex flex-col gap-10 px-5 pt-14 pb-10 md:px-12">
        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(12.5rem,100%),1fr))]">
          <div className="flex flex-col gap-2.5">
            <Link href="/" className="inline-flex items-center gap-2.5 font-semibold no-underline">
              <span className="text-accent">
                <Peaks size={20} />
              </span>
              {owner.name}
            </Link>
            <p className="font-mono text-xs text-muted">{t("role")}</p>
          </div>

          <nav aria-label={t("pages")} className="flex flex-col items-start">
            <h2 className="eyebrow mb-1.5 text-[0.6875rem]">{t("pages")}</h2>
            {pages.map(page => (
              <Link key={page.href} href={page.href} className={linkClass}>
                {page.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start">
            <h2 className="eyebrow mb-1.5 text-[0.6875rem]">{t("elsewhere")}</h2>
            {contacts.map(item => (
              <a key={item.id} href={item.href} className={linkClass}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            <h2 className="eyebrow mb-1.5 text-[0.6875rem]">{t("colophon")}</h2>
            <p className="text-sm text-soft">
              {t.rich("colophonText", {
                claude: chunks => (
                  <a href={claudeCodeUrl} className={inlineLink}>
                    {chunks}
                  </a>
                ),
                link: chunks => (
                  <a href={sourceUrl} className={inlineLink}>
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="hidden text-sm text-soft md:block">
              {t.rich("terminal", {
                button: chunks => <TerminalButton>{chunks}</TerminalButton>,
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs text-muted">
          <span>{t("rights", { year })}</span>
          <span>{t("stackLine")}</span>
        </div>
      </div>
    </footer>
  )
}
