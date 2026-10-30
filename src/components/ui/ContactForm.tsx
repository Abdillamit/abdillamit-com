"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useActionState, useState, type FormEvent } from "react"

import { sendMessage, type ContactState } from "@/app/(frontend)/[locale]/contact/actions"
import { checkFields } from "@/app/(frontend)/[locale]/contact/fields"
import { ease } from "@/components/motion/media"
import { SentCheck } from "@/components/motion/SentCheck"

const fieldClass =
  "w-full rounded-xl border bg-raise px-4 text-base text-ink transition-[border-color,box-shadow] outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,165,82,0.18)]"

const initial: ContactState = { status: "idle" }

function Form({ locale, onAgain }: { locale: string; onAgain: () => void }) {
  const t = useTranslations("Contact.form")
  const [state, action, pending] = useActionState(sendMessage, initial)
  const [values, setValues] = useState({ name: "", email: "", message: "" })
  const [tried, setTried] = useState(false)

  const local = checkFields(values.name.trim(), values.email.trim(), values.message.trim())
  const server = state.status === "invalid" ? state.errors : undefined
  const errors = {
    name: (tried && local.name) || Boolean(server?.name),
    email: (tried && local.email) || Boolean(server?.email),
    message: (tried && local.message) || Boolean(server?.message),
  }

  // Check in the browser first; the server checks again
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (local.name || local.email || local.message) {
      event.preventDefault()
      setTried(true)
    }
  }

  if (state.status === "sent") {
    return (
      <div role="status" className="flex min-h-[28.75rem] flex-col items-start justify-center gap-4.5">
        <SentCheck />
        <motion.p
          className="text-[2rem] leading-[1.1] font-medium tracking-[-0.03em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {t("sent")}
        </motion.p>
        <motion.p
          className="text-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {t("thanks", { name: state.name ?? "" })}
        </motion.p>
        <button
          type="button"
          onClick={onAgain}
          className="min-h-12 rounded-full border border-line-2 px-5 text-ink transition-colors hover:border-line-4 hover:bg-raise-2"
        >
          {t("again")}
        </button>
      </div>
    )
  }

  const field = (name: "name" | "email" | "message") => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: (event: { target: { value: string } }) =>
      setValues(previous => ({ ...previous, [name]: event.target.value })),
    "aria-invalid": errors[name],
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: `${fieldClass} ${errors[name] ? "border-error" : "border-line-2"}`,
  })

  const error = (name: "name" | "email" | "message", text: string) =>
    errors[name] ? (
      <span id={`contact-${name}-error`} className="text-[0.8125rem] text-error">
        {text}
      </span>
    ) : null

  return (
    <form action={action} onSubmit={onSubmit} noValidate aria-label={t("label")} className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />

      {/* Bots fill this in; people never see it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">{t("honeypot")}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm text-soft">
          {t("name")}
        </label>
        <input {...field("name")} type="text" autoComplete="name" className={`${field("name").className} min-h-13`} />
        {error("name", t("nameError"))}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm text-soft">
          {t("email")}
        </label>
        <input
          {...field("email")}
          type="text"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          className={`${field("email").className} min-h-13`}
        />
        {error("email", t("emailError"))}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm text-soft">
          {t("message")}
        </label>
        <textarea {...field("message")} rows={6} className={`${field("message").className} min-h-40 resize-y py-3.5`} />
        {error("message", t("messageError"))}
      </div>

      {state.status === "limited" && (
        <p role="alert" className="rounded-[10px] border border-error/40 bg-error/8 px-3.5 py-3 text-sm text-error">
          {t("limited")}
        </p>
      )}
      {state.status === "failed" && (
        <p role="alert" className="rounded-[10px] border border-error/40 bg-error/8 px-3.5 py-3 text-sm text-error">
          {t("failed")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <span className="font-mono text-xs text-muted">{t("note")}</span>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6.5 font-medium text-accent-ink transition hover:brightness-110 active:scale-[0.98] disabled:opacity-75 sm:w-auto"
        >
          {pending && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink"
            />
          )}
          {pending ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  )
}

// The contact form. "Write another" starts a fresh form.
export function ContactForm({ locale }: { locale: string }) {
  const [round, setRound] = useState(0)
  return <Form key={round} locale={locale} onAgain={() => setRound(value => value + 1)} />
}
