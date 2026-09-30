# 새솔가 모바일 웹사이트

새솔가 인테리어의 브랜드 소개와 프로젝트·서비스·문의 정보를 제공하는 모바일 중심 웹사이트입니다.

## Run & Operate

- `pnpm --filter @workspace/saesolga run dev` — run the website preview
- `pnpm --filter @workspace/saesolga run typecheck` — typecheck the website
- `pnpm --filter @workspace/saesolga run build` — build the website for production
- `pnpm --filter @workspace/api-server run dev` — run the API server when working on API features
- The website does not require environment secrets for its current public-facing pages.

## Stack

- pnpm workspaces, Node.js, TypeScript, React, and Vite
- Website: `artifacts/saesolga`
- Supporting API: Express (`artifacts/api-server`)
- Shared API client, API schema, and database packages: `lib/`

## Where things live

- `artifacts/saesolga/src/App.tsx` — website sections and interactions
- `artifacts/saesolga/src/index.css` — layout, typography, and responsive styles
- `artifacts/saesolga/public/assets/` — supplied images, icons, and font files
- `artifacts/api-server/src/` — API routes and server setup
- `lib/api-spec/` — API contract; `lib/db/` — database schema

## Architecture decisions

- The website and supporting API are separate workspace artifacts with independent workflows.
- Keep supplied brand assets and fonts under the website's public assets so the static site can load them directly.

## Product

The site presents the company introduction, credentials, partners, news, projects, services, and contact options in a mobile-first single-page layout.

## User preferences

- Keep the full supplied `ssd.png` image visible without cropping while sizing the hero to the mobile viewport. Do not add a separate black background behind the contact controls; the dark lower area is already part of the image.
- Keep the contact buttons and contact details overlaid on the lower part of that image.
- The hero phone and SMS buttons open the device's call and messaging apps; the QR button opens the supplied QR image in a popup.
- Preserve existing non-hero animations when adjusting visual sections.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
