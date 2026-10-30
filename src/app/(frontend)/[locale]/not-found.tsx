import { getTranslations } from "next-intl/server"

import { ButtonLink } from "@/components/ui/ButtonLink"

export default async function NotFound() {
  const t = await getTranslations("NotFound")

  return (
    <section className="frame flex min-h-[60vh] flex-col items-start justify-center gap-5 px-5 py-20 md:px-12">
      <p className="font-mono text-6xl text-accent">404</p>
      <h1 className="text-3xl font-medium tracking-tight">{t("title")}</h1>
      <p className="text-soft">{t("text")}</p>
      <ButtonLink href="/">{t("home")}</ButtonLink>
    </section>
  )
}
