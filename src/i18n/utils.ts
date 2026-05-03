import { ui, defaultLang, type Lang, type UIKey } from './ui'

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as Lang
  return defaultLang
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key]
  }
}

export function localizePath(path: string, lang: Lang): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `/${lang}${cleanPath ? '/' + cleanPath : ''}`
}
