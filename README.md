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

Node.js 22.23.4+ or 24.22.1+ (what Payload needs).

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run migrate              # create the tables
npm run seed                 # starting projects and the blog post
npm run dev
```

The site opens on http://localhost:3000 and redirects to your browser
language (`/ru` by default). The admin panel is on
http://localhost:3000/admin: the first account you create there becomes
the admin.

For a local database either use a separate Neon branch or Docker:

```bash
docker run -d --name abdillamit-db -p 5432:5432 \
  -e POSTGRES_USER=payload -e POSTGRES_PASSWORD=payload -e POSTGRES_DB=abdillamit \
  postgres:16
# DATABASE_URI=postgresql://payload:payload@localhost:5432/abdillamit
```

Without `S3_BUCKET` uploads are saved to the local `media/` folder.

## Content (Payload CMS)

| Collection | What it holds                                                                  |
| ---------- | ------------------------------------------------------------------------------ |
| Projects   | title, summary, description, role per language; slug, cover, gallery, stack, links, order; draft or published |
| Posts      | blog posts, one document for all three languages                               |
| Media      | images with alt text per language; sizes 480, 1080, 1920 and 1200×630 for Open Graph |
| Messages   | contact form messages; only admins can read them                               |
| Users      | admin (everything) and editor (content only)                                   |

Pages read content through the Local API in server components
(`src/lib/payload.ts`); visitors only see published documents.

When you change a collection:

```bash
npm run migrate:create       # writes a migration to src/migrations
npm run generate:types       # updates src/payload-types.ts
npm run generate:importmap   # after adding admin components or plugins
```

Commit the migration. On Vercel `vercel-build` runs `payload migrate`
before `next build`, so the production database is updated on deploy.

### Uploads to S3 or Cloudflare R2

The browser uploads files straight to the bucket (Vercel limits a
request to 4.5 MB), so the bucket needs a CORS rule:

```json
[
  {
    "AllowedOrigins": ["https://abdillamit.dev", "http://localhost:3000"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"]
  }
]
```

With `S3_PUBLIC_URL` (a public bucket or a custom domain) images are
served straight from it; without it they go through `/api/media`.

## Structure

```
src/
├─ app/(frontend)/[locale]/   pages of the site
├─ app/(payload)/             admin panel and API
├─ payload/                   collections, access rules, seed
├─ payload.config.ts          Payload config
├─ payload-types.ts           generated types
├─ migrations/                database migrations
├─ components/three/          3D scene (stage 3)
├─ components/motion/         animations (stage 3)
├─ components/ui/             header, footer, buttons
├─ i18n/                      locales and navigation
├─ lib/                       site facts and helpers
└─ proxy.ts                   adds the locale to page URLs
messages/                     interface texts: ru, en, ky
content/blog/                 posts from the old Astro site, source for `npm run seed`
```

Texts live in `messages/*.json`; Russian is the source, the other two
files must have the same keys.
