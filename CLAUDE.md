# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a **monorepo** containing a wedding/event services website with two main applications:

- **Backend**: Strapi CMS (`apps/back/`) - Content management system running on port 1337
- **Frontend**: Next.js application (`apps/front/`) - User-facing website running on port 3000

The project uses a **JAMstack architecture** with Strapi as a headless CMS providing content via API to the Next.js frontend.

## Development Commands

### Quick Start
```bash
# Start both services with Docker Compose
docker-compose up

# Or run individually:
cd apps/back && npm run develop    # Start Strapi CMS (port 1337)
cd apps/front && npm run dev       # Start Next.js app (port 3000)
```

### Backend (Strapi)
```bash
cd apps/back
npm run develop          # Development with auto-reload
npm run build           # Build admin panel
npm run start           # Production mode
npm run console         # Access Strapi console
```

### Frontend (Next.js)
```bash
cd apps/front
npm run dev             # Development server
npm run build           # Production build
npm run start           # Production server
npm run lint            # Run ESLint
```

### Testing
```bash
cd apps/front
npm run cypress:open         # Open Cypress test runner
npm run e2e                  # Run E2E tests headless
npm run component            # Run component tests headless
```

## Code Architecture

### Content Types (Strapi)
The CMS manages these content types in `apps/back/src/api/`:
- `accueil` - Homepage content
- `about` - About page content
- `mariage` - Wedding services
- `entreprise` - Corporate services
- `blog` - Blog posts
- `article` - Individual articles
- `category` - Content categories
- `contact` - Contact information
- `global` - Site-wide settings

### Frontend Structure
- **Components** in `apps/front/components/`:
  - `blocks/` - Complex UI sections (HeroSection, ContentSection)
  - `elements/` - Reusable UI elements (ContactForm, Media)
  - `globals/` - Global components (Button, RichText)
  - `layout/` - Layout components (Header, Footer)
- **Pages** in `apps/front/pages/` - Page-specific components
- **Data fetching** in `apps/front/data/` - API utilities for Strapi
- **Contexts** in `apps/front/contexts/` - React contexts (LocaleContext for i18n)

### Tech Stack
- **Backend**: Strapi 5.13.0, TypeScript, SQLite
- **Frontend**: Next.js 15.1.7, React 19, TypeScript, Tailwind CSS
- **Testing**: Cypress (E2E and component tests)
- **Monitoring**: Sentry integration
- **Validation**: React Hook Form with Zod

## Database & Content

The project uses **SQLite** database with Strapi's content management. Content is managed through the Strapi admin panel at `http://localhost:1337/admin`.

## Deployment

- **Development**: Docker Compose setup
- **Production**: Configured for Render.com deployment
- Both services have separate Dockerfiles for containerized deployment