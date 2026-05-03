export const languages = {
  ru: 'RU',
  en: 'EN',
  ky: 'KY'
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = 'ru'

export const ui = {
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'Обо мне',
    'nav.projects': 'Проекты',
    'nav.blog': 'Блог',
    'home.intro': 'Привет. Меня зовут Абдылламит — инженер-программист из Бишкека.',
    'home.subintro': 'Пишу на TypeScript, React и Gatsby.js. Работаю в ManchoDevs над finik.kg и другими продуктами. Ниже — список последних постов.',
    'home.recent': 'Последние посты',
    'home.allPosts': 'все посты →',
    'about.title': 'Обо мне',
    'projects.title': 'Проекты',
    'blog.title': 'Блог',
    'blog.empty': 'Пока пусто. Скоро напишу.',
    'post.back': '← назад к блогу',
    'post.published': 'Опубликовано',
    'footer.text': 'Сделано в Бишкеке.'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'home.intro': 'Hi. I\'m Abdyllamit — a software engineer from Bishkek.',
    'home.subintro': 'I write TypeScript, React, and Gatsby.js. I work at ManchoDevs on finik.kg and other products. Recent posts below.',
    'home.recent': 'Recent posts',
    'home.allPosts': 'all posts →',
    'about.title': 'About',
    'projects.title': 'Projects',
    'blog.title': 'Blog',
    'blog.empty': 'Nothing here yet. Soon.',
    'post.back': '← back to blog',
    'post.published': 'Published',
    'footer.text': 'Made in Bishkek.'
  },
  ky: {
    'nav.home': 'Башкы бет',
    'nav.about': 'Мен жөнүндө',
    'nav.projects': 'Долбоорлор',
    'nav.blog': 'Блог',
    'home.intro': 'Салам. Менин атым Абдылламит — Бишкектен программалык инженер.',
    'home.subintro': 'TypeScript, React жана Gatsby.js менен иштейм. ManchoDevs компаниясында finik.kg жана башка продукттарды иштеп чыгам. Төмөндө — акыркы посттор.',
    'home.recent': 'Акыркы посттор',
    'home.allPosts': 'бардык посттор →',
    'about.title': 'Мен жөнүндө',
    'projects.title': 'Долбоорлор',
    'blog.title': 'Блог',
    'blog.empty': 'Азырынча эч нерсе жок. Жакында жазам.',
    'post.back': '← блогго кайтуу',
    'post.published': 'Жарыяланган',
    'footer.text': 'Бишкекте жасалган.'
  }
} as const

export type UIKey = keyof typeof ui[typeof defaultLang]
