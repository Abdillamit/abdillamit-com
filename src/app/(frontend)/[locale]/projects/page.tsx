import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/components/ui/PageHeader"
import { enterLocale, readLocale, type LocaleParams } from "@/i18n/params"

type Props = { params: LocaleParams }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await readLocale(params)
  const t = await getTranslations({ locale, namespace: "Projects" })
  return { title: t("title"), description: t("intro") }
}

// The list itself comes from Payload (stages 2 and 4)
export default async function ProjectsPage({ params }: Props) {
  await enterLocale(params)
  const t = await getTranslations("Projects")

  return <PageHeader title={t("title")} lede={t("intro")} />
}
