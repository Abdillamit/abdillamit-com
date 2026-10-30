"use client"

import type { ReactNode } from "react"

import { useTerminal } from "./TerminalProvider"

// "open it" in the footer
export function TerminalButton({ children }: { children: ReactNode }) {
  const { open } = useTerminal()
  return (
    <button
      type="button"
      onClick={open}
      className="cursor-pointer text-ink underline decoration-line-4 underline-offset-4 hover:decoration-current"
    >
      {children}
    </button>
  )
}
