# CLAUDE.md

Guidance for Claude Code working in this repository.

> **No secrets in this file.** `pawanbhatta/portfolio` is a **public** GitHub repo. Cloudflare account/zone IDs and API tokens live in this project's local memory directory, never here.

---

## What this is

`3d-portfolio` — Pawan Bhatta's personal portfolio, served at **https://pawanbhatta.com.np**.

React 18 + Vite 4 + Tailwind 3 + three.js (`@react-three/fiber`, `@react-three/drei`) + framer-motion + `@emailjs/browser`. No TypeScript, no test suite, no linter config. Last upstream commit May 2023.

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

`src/Components/Contact.jsx` has EmailJS service and template IDs hardcoded. They are publishable-by-design keys, so this is not a leak, but there is no `.env` in this project and no `import.meta.env` usage anywhere.

## Hosting

**Cloudflare Pages**, project `pawanbhatta-portfolio`, production branch `master`, at `pawanbhatta-portfolio.pages.dev`. DNS is on Cloudflare.

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

## Known issues

- **Asset weight** (pre-existing, unrelated to the outage): `tripguide.png` 3.4 MB, `herobg.png` 930 KB, `carrent.png` and `jobit.png` ~755 KB each; JS bundle 1.16 MB (343 KB gzip). Worth compressing and code-splitting.
- No error boundary around the `Canvas` components — a model that fails to load takes down the whole page rather than degrading. That is what turned fault 3 above into a blank screen.
- `react-scripts@5.0.1` sits in `dependencies` and is unused (this is a Vite app). Removing it drops a large dependency tree.
- `public/pawan-bhatta-cv.pdf` is committed and linked from the Hero section, so it is intentionally public. It is the source of truth for the copy in `src/constants/index.js` — update both together.
