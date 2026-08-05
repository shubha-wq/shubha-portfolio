# Shubha Singh — Portfolio

Next.js + Tailwind rebuild of the Framer portfolio. All content lives in `/content` as
plain JSON, separate from the design — that's what makes this editable by hand or by
an AI without touching any code.

## What's real vs. draft right now

- `content/site.json` — hero, journey, contact copy. Real, rewritten per the audit
  (leads with brand/fashion strategy, not the old brand+product blend).
- `content/projects.json` — **Mohmani** is your real case study copy, pulled from the
  live site. The other three (Voucher Management System, Encasa Bistro, Traya hamper
  seeding) are marked `[DRAFT]` — built from your resume bullets since I could only
  fetch your homepage, not those three sub-pages. Open the file and swap in your real
  case study text, and add the project image URLs (the `image.src` fields are empty
  for those three).
- The "Featured Projects" Instagram/Notion links block from the old site is cut, per
  the audit — the four real case studies are the only project section now.
- `hero.resumeUrl` points to `/Shubha-Singh-Resume.pdf` — add that PDF into `/public`
  once your resume is finalized, to replace the Google Doc link.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

**By hand:** open `content/site.json` or `content/projects.json` in any text editor
(including GitHub's own web editor at github.com — no local setup needed) and edit
the text directly. Save, commit, push.

**Via an AI (Claude Code, or any tool with file/GitHub access):** just ask, e.g.
"Update the Encasa Bistro case study with the real outcome numbers" — the AI edits
the same JSON file and commits. No CMS, no API to teach it, no separate admin panel.

**Adding a new case study:** add one more object to `content/projects.json` with a
new `slug`. The page at `/projects/your-slug` is generated automatically — no new
files needed.

## Deploying

1. Push this folder to a new GitHub repo.
2. Go to vercel.com → **Add New Project** → import that repo. Vercel auto-detects
   Next.js; no config needed.
3. Every push to `main` auto-deploys. Vercel gives you a free `*.vercel.app` URL, and
   you can attach a custom domain later under Project Settings → Domains.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, with custom tokens in `tailwind.config.ts` (ink / parchment / brass /
  oxblood palette, Fraunces + Inter + Space Mono type)
- Images currently hotlinked from your existing Framer CDN URLs — fine short-term,
  but for reliability, download them and drop them in `/public` instead, then update
  the `image.src` paths in the content files.
