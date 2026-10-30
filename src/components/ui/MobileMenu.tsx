"use client"

import { useEffect, useId, useRef, useState } from "react"

import { Link, usePathname } from "@/i18n/navigation"

import { LocaleSwitcher } from "./LocaleSwitcher"
import { isCurrent, type NavItem } from "./NavLinks"

type Props = {
  items: NavItem[]
  contacts: { href: string; label: string }[]
  labels: { menu: string; close: string; nav: string; contacts: string }
}

// Menu for phones: big section links that rise line by line, the
// language and a few contacts at the bottom.
export function MobileMenu({ items, contacts, labels }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [openedOn, setOpenedOn] = useState(pathname)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close after navigation
  if (pathname !== openedOn) {
    setOpenedOn(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener("keydown", onKeyDown)
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.documentElement.style.overflow = ""
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(value => !value)}
        className="relative flex size-12 items-center justify-center"
      >
        <span className="relative block h-5 w-5" aria-hidden="true">
          <span
            className={`absolute inset-x-0 h-[1.5px] bg-current transition-transform duration-300 ${
              open ? "top-[9px] rotate-45" : "top-[6px]"
            }`}
          />
          <span
            className={`absolute inset-x-0 h-[1.5px] bg-current transition-transform duration-300 ${
              open ? "top-[9px] -rotate-45" : "top-[13px]"
            }`}
          />
        </span>
        <span className="sr-only">{open ? labels.close : labels.menu}</span>
      </button>

      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-15 bottom-0 z-30 flex flex-col overflow-y-auto border-t border-line bg-bg"
        >
          <nav aria-label={labels.nav} className="flex-1 px-5 pt-6">
            <ul>
              {items.map((item, index) => (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                    className="flex animate-line-up items-baseline gap-4 py-4.5 text-[2.5rem] leading-[1.05] font-medium tracking-[-0.035em] no-underline aria-[current=page]:text-accent"
                    style={{ animationDelay: `${index * 0.07}s` }}
                  >
                    <span
                      className="min-w-7 font-mono text-xs font-normal tracking-normal text-muted"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex animate-rise flex-col gap-6 border-t border-line px-5 pt-6 pb-8 [animation-delay:0.3s]">
            <LocaleSwitcher variant="menu" />
            <div className="flex flex-col">
              <span className="eyebrow pb-1.5 text-[0.6875rem]">{labels.contacts}</span>
              {contacts.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center text-soft no-underline hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
