import type { routing } from "@/i18n/routing"
import type messages from "../messages/ru.json"

// Typed locales and message keys for next-intl. Russian is the source
// language; en.json and ky.json must have the same keys.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
