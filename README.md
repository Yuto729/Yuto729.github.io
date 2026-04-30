# yuto729.github.io

Personal portfolio site. Built with [Astro](https://astro.build) + Tailwind CSS, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Structure

```
src/
├── content/experience/   # Markdown for each work experience
├── layouts/              # BaseLayout
├── components/           # TerminalHero, TechSkills, ExperienceCard
├── pages/
│   ├── index.astro       # Overview
│   ├── experience/       # /experience/ list + dynamic [slug] pages
│   └── writing.astro     # Publications list
└── styles/global.css
```

## Adding a new experience

Create a new file under `src/content/experience/`:

```yaml
---
company: Example Inc.
role: Software Engineer
period: 2025 – Present
location: Tokyo, Japan
summary: One-line summary.
tags: [Tag1, Tag2]
order: 0  # smaller = shown first
links:
  - label: Press release
    url: https://example.com
---

## Overview
...
```

## Deploy

GitHub Actions deploys `main` branch automatically. Configure GitHub Pages source as **GitHub Actions** in repo settings.

## Resume PDF

Hosted on Google Drive. Link is hardcoded in `src/pages/index.astro` (`Resume (PDF)`).
