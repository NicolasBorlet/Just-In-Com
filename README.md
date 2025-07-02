# Wedding & Event Services Platform

A modern JAMstack wedding and event services website built with Next.js and Strapi CMS. This monorepo contains both the frontend user experience and backend content management system.

## 🏗️ Architecture

This project follows a **JAMstack architecture** with:

- **Frontend**: Next.js 15.1.7 with React 19 and TypeScript
- **Backend**: Strapi 5.13.0 CMS with TypeScript
- **Database**: SQLite for development
- **Styling**: Tailwind CSS
- **Testing**: Cypress for E2E and component tests

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
# Start both services
docker-compose up

# Access the applications
# Frontend: http://localhost:3000
# Backend Admin: http://localhost:1337/admin
```

### Manual Setup
```bash
# Backend (Strapi CMS) - Terminal 1
cd apps/back
npm install
npm run develop

# Frontend (Next.js) - Terminal 2
cd apps/front
npm install
npm run dev
```

## 📁 Project Structure

```
just-in-com/
├── apps/
│   ├── back/                 # Strapi CMS
│   │   ├── src/api/         # Content types & API routes
│   │   ├── config/          # Strapi configuration
│   │   └── ...
│   └── front/               # Next.js frontend
│       ├── components/      # React components
│       │   ├── blocks/      # Complex UI sections
│       │   ├── elements/    # Reusable UI elements
│       │   ├── globals/     # Global components
│       │   └── layout/      # Layout components
│       ├── pages/           # Next.js pages
│       ├── data/            # API utilities
│       └── contexts/        # React contexts
├── docker-compose.yml       # Multi-service setup
└── README.md
```

## 🛠️ Development Commands

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

## 📊 Content Management

The Strapi CMS manages these content types:

- **accueil** - Homepage content
- **about** - About page content
- **mariage** - Wedding services
- **entreprise** - Corporate services
- **blog** - Blog posts
- **article** - Individual articles
- **category** - Content categories
- **contact** - Contact information
- **global** - Site-wide settings

Access the admin panel at `http://localhost:1337/admin` after starting the backend.

## 🎯 Key Features

- **Multilingual Support** - Internationalization with LocaleContext
- **Form Validation** - React Hook Form with Zod schemas
- **Error Monitoring** - Sentry integration
- **Responsive Design** - Mobile-first Tailwind CSS
- **SEO Optimized** - Next.js built-in SEO features
- **Component Testing** - Comprehensive Cypress test suite

## 🚢 Deployment

The project is configured for deployment on Render.com with separate Dockerfiles for each service.

### Production Deployment
1. Build both services: `docker-compose build`
2. Deploy to your hosting platform
3. Configure environment variables for production

## 🧪 Testing Strategy

- **Component Tests**: Testing individual React components
- **E2E Tests**: Full user journey testing
- **API Tests**: Backend endpoint validation

Run tests with:
```bash
npm run cypress:open    # Interactive testing
npm run e2e            # Headless E2E tests
npm run component      # Headless component tests
```

## 🔧 Tech Stack

**Frontend:**
- Next.js 15.1.7
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation

**Backend:**
- Strapi 5.13.0
- TypeScript
- SQLite
- RESTful API

**DevOps:**
- Docker & Docker Compose
- Cypress testing
- ESLint
- Sentry monitoring

## 📝 Development Guidelines

1. **Components**: Follow the established folder structure in `components/`
2. **Styling**: Use Tailwind CSS classes
3. **API**: Use utilities in `data/` for Strapi integration
4. **Testing**: Write component and E2E tests for new features
5. **Content**: Manage content through Strapi admin panel

## 🤝 Contributing

1. Create feature branches from `develop`
2. Follow TypeScript and ESLint conventions
3. Write tests for new functionality
4. Update documentation as needed

## 📞 Support

For questions about the codebase architecture or deployment, refer to the `CLAUDE.md` file for detailed guidance.