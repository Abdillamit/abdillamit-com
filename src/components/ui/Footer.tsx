import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { contacts, owner, sourceUrl } from "@/lib/site"

import { Peaks } from "./Peaks"

const linkClass =
  "inline-flex min-h-9 items-center text-[0.95rem] text-soft no-underline transition-colors hover:text-ink"

export async function Footer() {
  const t = await getTranslations("Footer")
  const nav = await getTranslations("Nav")
  const year = new Date().getFullYear()

  const pages = [
    { href: "/", label: nav("home") },
    { href: "/projects", label: nav("projects") },
    { href: "/about", label: nav("about") },
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
            {contacts.map(contact => (
              <a key={contact.id} href={contact.href} className={linkClass}>
                {contact.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start">
            <h2 className="eyebrow mb-1.5 text-[0.6875rem]">{t("colophon")}</h2>
            <p className="text-sm text-soft">
              {t.rich("colophonText", {
                link: chunks => (
                  <a
                    href={sourceUrl}
                    className="underline decoration-line-4 underline-offset-4 hover:text-ink hover:decoration-current"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>

        <p className="border-t border-line pt-6 font-mono text-xs text-muted">
          {t("rights", { year })}
        </p>
      </div>
    </footer>
  )
}
