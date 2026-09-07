# CLAUDE.md

Guidance for Claude Code working in this repository.

> **No secrets in this file.** `pawanbhatta/portfolio` is a **public** GitHub repo. Cloudflare account/zone IDs and API tokens live in this project's local memory directory, never here.

---

## What this is

`3d-portfolio` — Pawan Bhatta's personal portfolio, served at **https://pawanbhatta.com.np**.

React 18 + Vite 4 + Tailwind 3 + three.js (`@react-three/fiber`, `@react-three/drei`) + framer-motion + `@emailjs/browser`. No TypeScript, no test suite, no linter config.

**The code is on branch `master`, not `main`.** `main` holds a single empty "Initial commit" with only `.gitignore` and `LICENSE`. Anything pointed at the default branch builds nothing — this has already caused confusion once.

## Commands

```bash
npm install --legacy-peer-deps   # plain `npm ci` fails: prints a usage dump on npm 10.8.2 + lockfileVersion 3
npm run dev                      # Vite dev server
npm run build                    # -> dist/  (~25 MB, 90 files)
npm run preview                  # serve the build locally
```

**This project uses npm.** `package-lock.json` is the only lockfile of record; `yarn.lock` and `pnpm-lock.yaml` are gitignored so a stray `yarn` run cannot reintroduce lockfile drift. A previous yarn run also added a `packageManager: yarn@1.22.22` field to `package.json` — that has been reverted. Do not run `yarn` in this repo.

Build runs fine on Node 18. **Wrangler needs Node 20+** — use `nvm use 22`.

## Layout

```
src/
├── App.jsx, main.jsx, styles.js, index.css
├── Components/    Hero, About, Tech, Works, Experience, Feedbacks, Contact, Navbar, Loader
├── constants/     all page copy and project/experience data (index.js)
├── hoc/           SectionWrapper — wraps sections with motion + section id
├── utils/         motion.js — framer-motion variant factories
└── assets/        images, imported through assets/index.js
public/
├── desktop_pc/    glTF model — scene.gltf 1.7 MB + scene.bin 4.3 MB + textures
└── planet/        glTF model — scene.gltf 9.7 KB + scene.bin 1.6 MB + textures
```

Content edits almost always belong in `src/constants/index.js`, not in components.

`src/Components/Contact.jsx` reads EmailJS credentials from `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` — see `.env.example`. These are publishable client-side keys, not secrets. **No EmailJS account is configured yet**, so the form deliberately tells visitors to email directly instead of silently failing. It previously posted to the tutorial author's service with `to_email: sujata@jsmastery.pro`, so enquiries never reached Pawan.

## Hosting

**Cloudflare Pages**, project `pawanbhatta-portfolio`, production branch `master`, at `pawanbhatta-portfolio.pages.dev`. DNS is on Cloudflare, entirely on the free tier.

The apex and `www` are **live**: both are proxied CNAMEs to `pawanbhatta-portfolio.pages.dev` with real Cloudflare Universal SSL certs. The InfinityFree A records are gone from both. The 8 old project subdomains (`coronatracker`, `exercisetracker`, `myblog`, `newspeaker`, `policyforum`, `sms`, `todoapp`, `youtube`) still point at `185.27.134.151` and are all still broken — decide whether to delete those records.

Deploys are currently **manual direct uploads** — the project is not yet connected to Git:

```bash
nvm use 22
export CLOUDFLARE_API_TOKEN=...   # needs Cloudflare Pages:Edit
export CLOUDFLARE_ACCOUNT_ID=...
npm run build
npx wrangler pages deploy dist --project-name=pawanbhatta-portfolio --branch=master --commit-dirty=true
```

`npx wrangler@latest` has hit `ETIMEDOUT` here; if it does, `npm install --no-save wrangler@3` and run `./node_modules/.bin/wrangler`.

Connecting the project to GitHub (so a push to `master` deploys) needs a GitHub OAuth grant that only the account owner can give in the dashboard — an API token cannot do it.

### Migrated away from InfinityFree — do not go back

The site previously ran on InfinityFree free hosting and was down. Three independent faults, all diagnosed 2026-09-07:

1. Every A record was **proxied through Cloudflare onto InfinityFree, which does not support the Cloudflare proxy.** Their anti-bot layer issues a `__test` cookie bound to the visitor IP; behind the proxy the origin sees rotating edge IPs, so the cookie never validates → challenge loop, or **HTTP 520** when the origin drops the connection.
2. `www` was grey-clouded and the origin serves a **self-signed wildcard cert** (`CN=*`, valid to 2053) → browser security warning.
3. **InfinityFree does not serve `.bin` files.** `/desktop_pc/scene.bin` redirected to `infinityfree.net/errors/404/` while `scene.gltf` in the same directory parsed fine. GLTFLoader then threw, killing the React tree (`computeBoundingSphere(): Computed radius is NaN`, then `WebGLRenderer: Context Lost`). **This is the fault users actually saw.** It is not a size limit — `scene.bin` is 4.3 MB and `logo.svg` served byte-exact from the same tree.

Cloudflare Pages resolves all three. Serving these glTF models from a host that blocks binary extensions is not workable.

### Debugging note

InfinityFree's origin returns **"Empty reply from server"** to `curl`'s default user-agent, which makes a healthy server look dead — it caused one wrong diagnosis in this project. Always send a browser UA when probing `185.27.134.151`. Do not try to solve the `__test` challenge in a script; the auto-mode classifier blocks it as bot-protection bypass, and it is not needed.

## Conventions

- Plain JSX, no types. Tailwind utility classes inline; shared class recipes in `src/styles.js`.
- Sections are composed in `App.jsx` and wrapped with `SectionWrapper` from `src/hoc/`.
- Animation variants come from `src/utils/motion.js` — reuse the factories rather than inlining variants.
- Assets are imported via `src/assets/index.js`, not by raw path.

## Content and assets

- `public/pawan-bhatta-cv.pdf` is committed and linked from the Hero, so it is intentionally public. **It is the source of truth for the copy in `src/constants/index.js`** — update both together.
- `src/constants/index.js` exports `profile`, `services`, `technologies`, `experiences`, `education`, `testimonials` and `projects`. `experiences` is ordered **oldest-first** because `VerticalTimeline` renders in array order.
- `testimonials` is intentionally empty; `Feedbacks` returns `null` rather than rendering a bare section header. Populate the array to bring the section back.
- Project cards fall back to a gradient initials tile when `image` is null and hide the repo button when `source_code_link` is empty — most of this work is client work with no public repo. Both paths still work normally once real values are supplied.
- All four canvases are wrapped in `CanvasErrorBoundary`, which must stay **outside** `<Canvas>`: r3f forwards errors from its own reconciler to the enclosing React tree, and the fallback is DOM. This is what stops a repeat of fault 3 blanking the page.
- `build.rollupOptions.output.manualChunks` splits three / r3f+drei / framer-motion / react out of page code, so a copy edit invalidates ~54 KB rather than the whole 1.17 MB bundle. Keep it when upgrading Vite.

## Known issues

- The hero background is a 1920px JPEG at q85 (287 KB). Fine line art on dark banded badly at lower quality; do not push it much further without looking at the result.
- No test suite, so the `CanvasErrorBoundary` runtime catch path is unverified — it compiles, but nothing exercises it.
- The contact form has no working backend until an EmailJS service exists.
