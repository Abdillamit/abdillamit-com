"use client"

import { useEffect, useId, useRef, useState } from "react"

import { Link, usePathname } from "@/i18n/navigation"

import { isCurrent, type NavItem } from "./NavLinks"

type Props = {
  items: NavItem[]
  labels: { menu: string; close: string; nav: string }
}

// Menu for small screens: a button and a panel under the header
export function MobileMenu({ items, labels }: Props) {
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
        className="relative -mr-2 flex size-11 items-center justify-center"
      >
        <span className="relative block h-2.5 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
              open ? "translate-y-[4.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
              open ? "-translate-y-[4.5px] -rotate-45" : ""
            }`}
          />
        </span>
        <span className="sr-only">{open ? labels.close : labels.menu}</span>
      </button>

      {open && (
        <nav
          id={panelId}
          aria-label={labels.nav}
          className="fixed inset-x-0 top-[3.75rem] bottom-0 z-30 overflow-y-auto border-t border-line bg-bg px-5 pt-6 pb-10"
        >
          <ul>
            {items.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4 text-4xl font-medium tracking-tight no-underline aria-[current=page]:text-accent"
                >
                  <span className="min-w-7 font-mono text-xs text-muted" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
