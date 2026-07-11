# Minimalist Interior Design Website

AReact + Vite + Tailwind CSS v4 site for **Alpana S. Design**, exported from Figma Make and adapted into a standalone, deployable web app.

Original design: https://www.figma.com/design/7T3WqoXFlLwY6cCWXnom66/Minimalist-Interior-Design-Website

## Tech stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- A full set of shadcn/ui + Radix components are included under `src/app/components/ui` for future use, even though the current homepage is a single self-contained component and doesn't use them yet.

## Running locally

```bash
npm install
npm run dev
```

This starts the dev server (usually at `http://localhost:5173`) with hot reload.

## Building for production

```bash
npm run build
```

Outputs a production build to the `dist/` folder. You can preview it locally with:

```bash
npx vite preview
```

## Deploying to Netlify

This repo includes a `netlify.toml` that's already configured:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20

### Option A — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --build --prod
```

### Option B — Netlify dashboard (Git-based, recommended)

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project**, and select the repo.
3. Netlify will auto-detect the settings from `netlify.toml` — just click **Deploy**.
4. Every future `git push` will auto-deploy.

### Option C — Drag and drop

1. Run `npm run build` locally.
2. Go to Netlify dashboard → **Add new site → Deploy manually**.
3. Drag the `dist/` folder onto the page.

## Project structure

```
src/
  app/
    App.tsx                # Main app: all pages (home, studio, work, contact, project)
    components/
      ui/                   # shadcn/ui component library (not currently used by App.tsx)
      figma/ImageWithFallback.tsx
  imports/
    logo.PNG
  styles/
    index.css               # imports fonts.css, tailwind.css, theme.css
    theme.css                # design tokens / CSS variables (colors, radius, etc.)
    fonts.css                # Google Fonts (Cormorant Garamond, DM Sans)
  main.tsx                   # React entry point
```

## Notes

- Navigation between pages (Home / Studio / Work / Contact / Project detail) is handled via internal React state in `App.tsx`, not URL routing — so there's only one real URL (`/`). The `netlify.toml` redirect rule is included as a safety net in case routing is added later.
- Images for project tiles currently point to Unsplash URLs. Swap these out for your own photography before going live.
