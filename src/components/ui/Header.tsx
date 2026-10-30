import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { contacts, owner } from "@/lib/site"

import { LocaleSwitcher } from "./LocaleSwitcher"
import { MobileMenu } from "./MobileMenu"
import { NavLinks, type NavItem } from "./NavLinks"
import { Peaks } from "./Peaks"

const github = contacts.find(contact => contact.id === "github")

export async function Header() {
  const t = await getTranslations("Nav")
  const items: NavItem[] = [
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="frame flex min-h-15 items-stretch gap-3 px-5 md:min-h-16 md:gap-7 md:px-6">
        <Link
          href="/"
          className="mr-auto flex items-center gap-3 font-semibold tracking-tight no-underline"
        >
          <span className="text-accent">
            <Peaks />
          </span>
          {owner.name}
        </Link>

        <nav aria-label={t("label")} className="hidden md:flex">
          <NavLinks items={items} />
        </nav>

        <LocaleSwitcher />

        {github && (
          <a
            href={github.href}
            aria-label="GitHub"
            title="GitHub"
            className="hidden size-11 flex-none items-center justify-center self-center rounded-full border border-line-2 text-ink transition-colors hover:border-line-4 hover:bg-raise-2 sm:flex"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
            </svg>
          </a>
        )}

        <div className="flex items-center md:hidden">
          <MobileMenu
            items={items}
            labels={{ menu: t("menu"), close: t("close"), nav: t("label") }}
          />
        </div>
      </div>
    </header>
  )
}
