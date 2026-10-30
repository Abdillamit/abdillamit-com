# abdillamit.dev

Portfolio of Abdillamit Mamytov, Full-Stack engineer from Bishkek.
Russian, English and Kyrgyz.

The site is itself a demo of the stack:

- **Next.js 16** (App Router), **TypeScript** strict, **Tailwind CSS 4**
- **next-intl** for `/ru`, `/en` and `/ky`
- **Payload CMS 3** inside the same Next.js app: admin panel, Postgres on Neon, uploads to S3
- **React Three Fiber** for the 3D scene, **GSAP ScrollTrigger**, **Framer Motion**, **Lenis**, **Lottie**
- Deployed on **Vercel**

The work goes in stages: skeleton and i18n → Payload and the database →
home page with 3D → projects and page transitions → contact form → SEO
and performance.

## Run locally

Node.js 20.9 or newer.

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev
```

The site opens on http://localhost:3000 and redirects to your browser
language (`/ru` by default).

## Structure

```
src/
├─ app/(frontend)/[locale]/   pages of the site
├─ app/(payload)/             admin panel and API (stage 2)
├─ components/three/          3D scene (stage 3)
├─ components/motion/         animations (stage 3)
├─ components/ui/             header, footer, buttons
├─ i18n/                      locales and navigation
├─ lib/                       site facts and helpers
└─ proxy.ts                   adds the locale to page URLs
messages/                     interface texts: ru, en, ky
content/blog/                 posts from the old Astro site, moved to Payload in stage 2
```

Texts live in `messages/*.json`; Russian is the source, the other two
files must have the same keys.
