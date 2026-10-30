"use client"

import { AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

// The terminal's code loads the first time someone opens it
const Terminal = dynamic(() => import("./Terminal"), { ssr: false })

const TerminalContext = createContext<{ open: () => void }>({ open: () => {} })

export const useTerminal = () => useContext(TerminalContext)

const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))

// ~ (the key left of 1, in any layout) or Ctrl/Cmd+K opens the terminal,
// Esc closes it.
export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault()
        close()
        return
      }
      const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"
      const backquote = event.code === "Backquote" && !event.metaKey && !event.ctrlKey && !event.altKey
      if (!shortcut && !(backquote && !typing(event.target))) return
      event.preventDefault()
      setOpen(value => !value)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, close])

  const value = useMemo(() => ({ open }), [open])

  return (
    <TerminalContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <Terminal key="terminal" onClose={close} />}</AnimatePresence>
    </TerminalContext.Provider>
  )
}
