# abdillamit.com

Личный сайт. Astro + TypeScript. Три языка: ru / en / ky.

## Запуск локально

Нужен Node.js 20+ и pnpm.

```bash
pnpm install
pnpm dev
```

Сайт откроется на http://localhost:4321

## Структура

```
src/
├── content/blog/        # посты блога
│   ├── ru/              # русские
│   ├── en/              # английские
│   └── ky/              # кыргызские
├── i18n/
│   ├── ui.ts            # все строки интерфейса (3 языка)
│   └── utils.ts         # хелперы
├── layouts/
│   └── BaseLayout.astro # шапка, навигация, футер
├── pages/
│   ├── index.astro      # редирект на /ru
│   └── [lang]/          # все страницы под /ru, /en, /ky
│       ├── index.astro
│       ├── about.astro
│       ├── projects.astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
└── styles/
    └── global.css       # один CSS на весь сайт
```

## Как добавить новый пост

Создай файл `.md` в `src/content/blog/{lang}/` с фронтматтером:

```markdown
---
title: "Название поста"
description: "Краткое описание для SEO"
pubDate: 2026-05-04
lang: ru
---

Текст поста здесь.
```

Поле `lang` обязательно — по нему пост попадает в нужный язык.
Если хочешь сохранить как черновик — добавь `draft: true`.

## Как изменить текст «обо мне»

Открой `src/pages/[lang]/about.astro` — там объект `bio` с тремя версиями.

## Как изменить проекты

Открой `src/pages/[lang]/projects.astro` — массив `projects` для каждого языка.

## Как изменить тексты в навигации/футере

Открой `src/i18n/ui.ts` — все строки там.

## Деплой на Cloudflare Pages

1. Залей репо на GitHub
2. На Cloudflare Pages → Connect to Git → выбери репо
3. Настройки билда:
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Node version: `20`
4. Готово. Дальше можно подключить домен `abdillamit.com` через Custom domains.

## Деплой на Vercel

То же самое — Import Project → Astro определится автоматически → Deploy.

## Команды

```bash
pnpm dev       # дев-сервер
pnpm build     # сборка в dist/
pnpm preview   # предпросмотр продакшн-сборки
```
