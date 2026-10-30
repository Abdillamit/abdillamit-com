"use client"

import { motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"

import { ease } from "@/components/motion/media"
import { usePathname, useRouter } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"

import {
  banner,
  complete,
  promptFor,
  runCommand,
  type Action,
  type Line,
  type Translate,
} from "./commands"

function Output({ line }: { line: Line }) {
  const tone = {
    input: "text-ink",
    text: "text-soft",
    muted: "text-muted",
    error: "text-error",
    art: "whitespace-pre text-accent",
  }[line.kind]

  return (
    <div className={`min-h-[1.5em] break-words whitespace-pre-wrap ${tone}`}>
      {line.kind === "input" ? (
        <>
          <span className="text-accent">{line.prompt}</span> {line.text}
        </>
      ) : (
        line.parts.map((part, index) =>
          part.href ? (
            <a
              key={index}
              href={part.href}
              target={part.href.startsWith("http") ? "_blank" : undefined}
              rel={part.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-ink underline decoration-line-4 underline-offset-4 hover:decoration-current"
            >
              {part.text}
            </a>
          ) : (
            <Fragment key={index}>{part.text}</Fragment>
          )
        )
      )}
    </div>
  )
}

// A small shell for curious visitors (~ or Ctrl+K opens it). It is a
// panel, not a modal: the page stays visible and `cd` moves it.
export default function Terminal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("Terminal") as unknown as Translate
  const home = useTranslations("Home")
  const about = useTranslations("About")
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const section = pathname.split("/")[1] ?? ""
  const prompt = promptFor(section)

  const [lines, setLines] = useState<Line[]>(() => banner(t))
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Focus the input on open and again after `cd`
  useEffect(() => {
    inputRef.current?.focus()
    const timer = setTimeout(() => inputRef.current?.focus(), 120)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const output = outputRef.current
    if (output) output.scrollTop = output.scrollHeight
  }, [lines])

  const run = (action?: Action) => {
    if (!action) return
    if (action.type === "navigate") router.push(action.to)
    if (action.type === "locale") router.replace(pathname, { locale: action.locale })
    if (action.type === "close") onClose()
    if (action.type === "open") window.location.href = action.href
    if (action.type === "download") {
      const anchor = document.createElement("a")
      anchor.href = action.href
      anchor.download = ""
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const result = runCommand(value, {
      t,
      locale,
      section,
      lede: home("lede"),
      journey: about.raw("journey") as { mark: string; title: string }[],
      resumePdf: about("resumePdf"),
    })
    const echo: Line = { kind: "input", prompt, text: value }
    if (result.action?.type === "clear") setLines([])
    else setLines(previous => [...previous, echo, ...result.output])
    if (value.trim()) setHistory(previous => [...previous, value])
    setHistoryIndex(-1)
    setValue("")
    run(result.action)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault()
      const result = complete(value)
      setValue(result.input)
      if (result.options.length) {
        setLines(previous => [
          ...previous,
          { kind: "input", prompt, text: value },
          { kind: "muted", parts: [{ text: result.options.join("  ") }] },
        ])
      }
    } else if (event.key === "ArrowUp" && history.length) {
      event.preventDefault()
      const index = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(index)
      setValue(history[index] ?? "")
    } else if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault()
      const index = historyIndex + 1
      if (index >= history.length) {
        setHistoryIndex(-1)
        setValue("")
      } else {
        setHistoryIndex(index)
        setValue(history[index] ?? "")
      }
    }
  }

  return (
    <motion.section
      role="dialog"
      aria-label={t("title")}
      className="fixed inset-x-2 bottom-2 z-50 flex max-h-[min(28rem,70dvh)] flex-col overflow-hidden rounded-2xl border border-line-2 bg-bg-deep/95 font-mono text-[0.8125rem] leading-relaxed shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6 md:w-[40rem]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-1.5 text-muted">
        <span className="truncate">{prompt.replace(/\$$/, "")}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="flex size-9 items-center justify-center rounded-full text-lg text-soft transition-colors hover:bg-raise-2 hover:text-ink"
        >
          ×
        </button>
      </div>
      {/* Clicking anywhere in the output puts the cursor back in the input */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto px-4 py-3"
      >
        <div aria-live="polite">
          {lines.map((line, index) => (
            <Output key={index} line={line} />
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="flex-none text-accent">
            {prompt}
            <span className="sr-only"> {t("input")}</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-base text-ink caret-accent outline-none md:text-[0.8125rem]"
          />
        </form>
      </div>
    </motion.section>
  )
}
