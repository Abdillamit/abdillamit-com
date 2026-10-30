import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { contact, owner } from "@/lib/site"

import { LocaleSwitcher } from "./LocaleSwitcher"
import { MobileMenu } from "./MobileMenu"
import { NavLinks, type NavItem } from "./NavLinks"
import { Peaks } from "./Peaks"

export async function Header() {
  const t = await getTranslations("Nav")
  const items: NavItem[] = [
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ]
  const menuContacts = [
    { href: contact("telegram").href, label: `Telegram · ${contact("telegram").short}` },
    { href: contact("email").href, label: contact("email").short },
    { href: contact("github").href, label: `GitHub · Abdillamit` },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="frame flex min-h-15 items-stretch gap-3 pr-2 pl-5 md:min-h-16 md:gap-6 md:px-6">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2.5 font-semibold tracking-tight no-underline"
        >
          <span className="text-accent">
            <Peaks />
          </span>
          {owner.name}
        </Link>

        <nav aria-label={t("label")} className="hidden md:flex">
          <NavLinks items={items} />
        </nav>

        <div className="hidden self-center md:block">
          <LocaleSwitcher />
        </div>

        <div className="flex items-center md:hidden">
          <MobileMenu
            items={items}
            contacts={menuContacts}
            labels={{
              menu: t("menu"),
              close: t("close"),
              nav: t("label"),
              contacts: t("contact"),
            }}
          />
        </div>
      </div>
    </header>
  )
}
