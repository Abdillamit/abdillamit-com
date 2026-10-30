"use client"

import { Link, usePathname } from "@/i18n/navigation"

export type NavItem = { href: string; label: string }

export const isCurrent = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

// Section links in the header; the current section gets an accent line
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <ul className="flex gap-1">
      {items.map(item => {
        const current = isCurrent(pathname, item.href)
        return (
          <li key={item.href} className="relative flex">
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`flex items-center px-3.5 text-sm no-underline transition-colors hover:text-ink ${
                current ? "text-ink" : "text-soft"
              }`}
            >
              {item.label}
            </Link>
            {current && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent shadow-[0_0_12px_rgba(255,165,82,0.45)]"
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
