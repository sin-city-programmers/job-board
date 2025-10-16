# Sin City Programmers Job Board

A modern job board platform built for the Sin City Programmers community, featuring a full-stack Next.js application with authentication, database integration, and a beautiful UI.

## About

This project serves as the central job board for the Sin City Programmers community, connecting professionals with opportunities in the Las Vegas area. Built with modern web technologies and designed for scalability and maintainability.

## Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/docs)** - React framework with App Router for optimal performance
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/docs/)** - Type-safe development
- **[TanStack Query](https://tanstack.com/query/latest)** - Powerful data fetching and server state management
- **[Tailwind CSS 4](https://tailwindcss.com/docs)** - Utility-first CSS framework with CSS-based configuration
- **[shadcn/ui](https://ui.shadcn.com/)** - Accessible, customizable UI components

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Serverless API endpoints
- **[Better-Auth](https://www.better-auth.com/)** - Modern authentication with TypeScript support

### Database

- **[Prisma](https://www.prisma.io/docs)** - Type-safe database ORM
- **[MySQL](https://dev.mysql.com/doc/)** - Relational database

### Build & Development

- **[Turborepo](https://turbo.build/repo/docs)** - High-performance build system
- **[ESLint](https://eslint.org/docs/)** - Code linting
- **[Prettier](https://prettier.io/docs/)** - Code formatting with Tailwind plugin
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## Quick Start

### Prerequisites

- **Node.js 22 LTS** - Latest LTS version with modern JavaScript features and improved performance
- **npm 10+** - Package manager
- **MySQL** - Database (hosted or local)
- **Git** - Version control

### Development Setup

#### 1. Fork and Clone

```bash
git clone https://github.com/sin-city-programmers/job-board.git sin-city-programmers-job-board # HTTPS
# OR
git clone git@github.com:sin-city-programmers/job-board.git sin-city-programmers-job-board # SSH
# OR
gh repo clone sin-city-programmers/job-board sin-city-programmers-job-board #GH CLI

cd sin-city-programmers-job-board
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Setup

```bash
cp .env.example .env
# Edit `.env with your configuration
```

#### 4. **Generate Prisma Client** (when database is ready)

```bash
npm run db:generate
```

#### 5. Verify Installation

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

| Variable                      | Description                      | Required | Example                                         | Notes                           |
| ----------------------------- | -------------------------------- | -------- | ----------------------------------------------- | ------------------------------- |
| `DATABASE_URL`                | MySQL database connection string | Yes      | `mysql://user:password@localhost:3306/database` | Used by Prisma                  |
| `BETTER_AUTH_SECRET`          | Secret key for authentication    | Yes      | `your-secret-key-here`                          | Generate a secure random string |
| `BETTER_AUTH_URL`             | Base URL for authentication      | Yes      | `http://localhost:3000`                         | Development URL                 |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Public URL for auth client       | Yes      | `http://localhost:3000`                         | Must match BETTER_AUTH_URL      |
| `NEXTAUTH_URL`                | NextAuth compatibility           | No       | `http://localhost:3000`                         | Legacy compatibility            |
| `NEXTAUTH_SECRET`             | NextAuth secret                  | No       | `your-nextauth-secret`                          | Legacy compatibility            |

OAuth provider variables are commented out in `.env.example` and can be configured as needed.

## Project Architecture

The project follows Next.js App Router conventions with a clear separation of concerns:

- **`src/app/`** - Next.js App Router directory containing all routes, layouts, and API endpoints
  - App Router uses file-system based routing where folders define routes
  - Special files: `layout.tsx` (shared UI), `page.tsx` (route UI), `route.ts` (API handlers)
  - Better-Auth API routes mounted at `/api/auth/*` for authentication

- **`src/components/`** - React components organized by purpose
  - `ui/` - shadcn/ui components (customizable, owned by project)
  - Shared components like theme provider and utility components

- **`src/lib/`** - Utility functions, configurations, and shared logic
  - Authentication instances (server and client)
  - Helper functions and utilities

- **`prisma/`** - Database schema and migrations
  - `schema.prisma` defines data models
  - Migrations track database changes over time

- **Configuration files** at root level control build, linting, and formatting behavior

## Available Scripts

| Command                | Description               | When to Use           |
| ---------------------- | ------------------------- | --------------------- |
| `npm run dev`          | Start development server  | Local development     |
| `npm run build`        | Build for production      | Before deployment     |
| `npm run start`        | Start production server   | Production deployment |
| `npm run lint`         | Run ESLint                | Code quality checks   |
| `npm run format`       | Format code with Prettier | Code formatting       |
| `npm run format:check` | Check code formatting     | Pre-commit validation |
| `npm run db:generate`  | Generate Prisma Client    | After schema changes  |
| `npm run db:push`      | Push schema to database   | Development only      |
| `npm run db:migrate`   | Create database migration | Schema changes        |
| `npm run db:studio`    | Open Prisma Studio        | Database management   |

## Key Architectural Decisions

### Why Next.js 15?

Next.js provides a complete React framework with built-in optimizations, server-side rendering, and API routes. The App Router offers improved performance and developer experience over the Pages Router.

### Why Tailwind CSS 4?

Tailwind CSS 4 uses CSS-based configuration instead of JavaScript config files, resulting in faster builds and better integration with modern tooling. The `@import "tailwindcss"` pattern simplifies setup.

### Why Better-Auth?

Better-Auth offers superior TypeScript support, more flexible configuration, and modern architecture compared to NextAuth. It provides better OAuth integration and type safety.

### Why TanStack Query?

TanStack Query provides powerful data synchronization for server state with automatic caching, background updates, and optimistic mutations. It integrates seamlessly with Next.js App Router, offers excellent TypeScript support, and includes built-in devtools for debugging. Perfect for managing complex data fetching patterns in modern React applications.

### Why Turborepo?

Turborepo optimizes build performance through intelligent caching and parallel execution. It's designed for monorepos but provides significant benefits even in single-package projects.

### Why shadcn/ui?

shadcn/ui provides full code ownership with copy-paste components. Unlike traditional component libraries, you own and can customize every component without package lock-in.

### Why Prisma?

Prisma offers type-safe database access with excellent TypeScript integration. It provides a clean API for database operations and handles migrations automatically.

## Development Workflow

- **Feature branches** - All development happens in feature branches
- **Pre-commit hooks** - Automatic linting and formatting via Husky
- **Hot reload** - Next.js provides instant feedback during development
- **Dark mode** - Built-in theme switching with system preference detection

## Deployment

**Application**: Deployed on Vercel for optimal Next.js performance and global CDN distribution.

**Database**: Self-hosted MySQL database on dedicated infrastructure for full control and data sovereignty.

Deployment instructions will be added as the infrastructure is finalized.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- Development setup
- Coding standards
- Git workflow
- Pull request process

## License & Team

This project is developed by and for the Sin City Programmers community.

---

Built with modern web technologies and designed for the Las Vegas community.
