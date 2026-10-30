import { getTranslations } from "next-intl/server"

import { ButtonLink } from "@/components/ui/ButtonLink"
import { enterLocale, type LocaleParams } from "@/i18n/params"
import { owner } from "@/lib/site"

type Props = { params: LocaleParams }

// Home page. The 3D scene and the scroll sections come in stage 3.
export default async function HomePage({ params }: Props) {
  await enterLocale(params)
  const t = await getTranslations("Home")

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="frame flex min-h-[38rem] flex-col justify-center gap-7 px-5 py-20 md:px-12 md:py-28">
        <p className="eyebrow animate-rise text-accent">[ {t("eyebrow")} ]</p>
        <h1 className="animate-rise text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.045em] [animation-delay:0.1s]">
          {owner.name}
          <span className="block text-accent">{t("role")}</span>
        </h1>
        <p className="max-w-xl animate-rise text-lg text-soft [animation-delay:0.2s] md:text-xl">
          {t("lede")}
        </p>
        <div className="flex animate-rise flex-wrap gap-3 [animation-delay:0.3s]">
          <ButtonLink href="/projects">{t("projectsCta")} →</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            {t("contactCta")}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
