# Shubha Singh — Portfolio

Next.js + Tailwind portfolio, styled to match a reference site (light background,
sans-serif type, circular avatar/social icons, subtle rounded corners, alternating
white/light-grey/dark-charcoal sections). All content lives in `/content` as plain
JSON, separate from the design — edit those files by hand or ask an AI to edit them.

## Images — all placeholders right now

Every image on the site (hero photo, journey photo, case study images, project
thumbnails) is currently a striped placeholder box, on purpose — real photos/images
weren't ready yet. To swap one in:

1. Drop the real image file into `/public` (e.g. `/public/hero.jpg`).
2. Open the relevant content file (`content/site.json` for hero/journey,
   `content/projects.json` for case studies, `content/external-projects.json` for
   the Projects page) and set that item's `image.src` to `/hero.jpg` (the path
   relative to `/public`).
3. The placeholder box disappears automatically once `src` isn't empty — no other
   code changes needed.

## Editing copy

`content/site.json`, `content/projects.json`, `content/external-projects.json`, and
`content/services.json` hold all the text. Edit any of them directly (by hand in
GitHub's web editor, or by asking an AI to edit the file) and the site picks it up
automatically on next deploy.

## Run it locally

```bash
npm install
npm run dev
```

## Deploying

Push to GitHub, import the repo on vercel.com, deploy. Every push to `main`
auto-redeploys.
