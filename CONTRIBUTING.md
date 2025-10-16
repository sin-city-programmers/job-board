# Contributing to Sin City Programmers Job Board

Thank you for contributing to the Sin City Programmers Job Board! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 22 LTS
- npm 10+
- Git
- MySQL database access (see Database Setup below)

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

This installs all project dependencies including:

- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS 4 for styling
- Prisma for database access
- Better-Auth for authentication
- shadcn/ui components
- Development tools (ESLint, Prettier, Husky)

#### 3. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

- **DATABASE_URL**: Connection string for your MySQL database
- **BETTER_AUTH_SECRET**: Generate a secure random string (32+ characters)
- **BETTER_AUTH_URL**: Your development URL (usually `http://localhost:3000`)
- **NEXT_PUBLIC_BETTER_AUTH_URL**: Must match BETTER_AUTH_URL

#### 4. Database Setup

**Hosted Database**
Access to the hosted database is currently being arranged.

**Local Database**
Install MySQL locally and create a database for development.

```bash
# Create local database
mysql -u root -p
CREATE DATABASE sin_city_job_board_dev;
```

#### 5. Generate Prisma Client

```bash
npm run db:generate
```

#### 6. Verify Installation

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to confirm everything is working.

## Project Architecture

### Modern Stack Decisions

#### Why Node.js 22 LTS?

Node.js 22 LTS provides the latest stable features, improved performance, and better support for modern JavaScript features. It's the recommended version for new projects.

#### Why Next.js 15?

Next.js provides a complete React framework with built-in optimizations, server-side rendering, and API routes. The App Router offers improved performance and developer experience.

#### Why Tailwind CSS 4?

Tailwind CSS 4 uses CSS-based configuration instead of JavaScript config files, resulting in faster builds and better integration with modern tooling. The `@import "tailwindcss"` pattern simplifies setup.

#### Why Better-Auth over NextAuth?

Better-Auth offers superior TypeScript support, more flexible configuration, and modern architecture. It provides better OAuth integration and type safety compared to NextAuth.

#### Why TanStack Query?

TanStack Query provides powerful data synchronization for server state with automatic caching, background updates, and optimistic mutations. It integrates seamlessly with Next.js App Router and offers excellent TypeScript support.

#### Why Turborepo?

Turborepo optimizes build performance through intelligent caching and parallel execution. It provides significant benefits even in single-package projects.

#### Why shadcn/ui?

shadcn/ui provides full code ownership with copy-paste components. Unlike traditional component libraries, you own and can customize every component without package lock-in.

## Coding Standards

### TypeScript Guidelines

- Use strict mode (enabled by default)
- Prefer interfaces over types when appropriate
- Explicit return types for functions
- Avoid `any` types
- Use proper generic constraints

### React/Next.js Patterns

- **Server Components by default** - Use client components only when necessary
- **File naming**: kebab-case for files, PascalCase for components
- **Component organization**: One component per file (multi-component files acceptable with justification)
- **Use `'use client'` directive** only when needed for interactivity

### Next.js App Router Guidelines

**For Backend Developers:**

- App Router uses file-system routing - folders define routes
- API routes use `route.ts` files with HTTP method exports
- Server Components run on the server, Client Components run in the browser
- Use Server Actions for form submissions and mutations

**For Frontend Developers:**

- Server Components are the default - they run on the server
- Client Components require `'use client'` directive
- Use `useState`, `useEffect`, and other hooks only in Client Components
- Server Components can directly access databases and APIs

**Common Pitfalls:**

- Don't use browser APIs in Server Components
- Don't use hooks in Server Components
- Client Components can't directly access server-side APIs
- Import order matters for Server vs Client Components

### Data Fetching with TanStack Query

- Use `getQueryClient()` for server-side prefetching in Server Components
- Wrap prefetched data with `HydrationBoundary` for proper hydration
- Use `useQuery` for data fetching in Client Components
- Use `useMutation` for data modifications with cache invalidation
- Always handle loading and error states appropriately

### Styling with Tailwind

- Use Tailwind utilities first
- Extract components for repeated patterns
- When combining static and dynamic classNames, use the `cn()` helper instead of template literals
- Use CVA (Class Variance Authority) for variant-based styling
- **Note**: Prettier plugin doesn't sort classes in `cva()` calls - manual sorting required

### Component Patterns

- Use shadcn/ui components as base
- Extend with additional variants as needed
- Keep components focused and single-purpose
- Multi-component files are acceptable with clear justification

## Code Formatting & Linting

### Prettier Configuration

Our Prettier configuration enforces consistent code style:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "bracketSameLine": false,
  "singleAttributePerLine": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Configuration Details:**

- `semi: true` - Always use semicolons
- `trailingComma: "es5"` - Trailing commas where valid in ES5
- `singleQuote: true` - Use single quotes for strings
- `printWidth: 100` - Wrap lines at 100 characters
- `arrowParens: "always"` - Always use parentheses around arrow function parameters
- `bracketSameLine: false` - Put `>` on new line for JSX
- `singleAttributePerLine: true` - One attribute per line in JSX
- `prettier-plugin-tailwindcss` - Sorts Tailwind classes (except in CVA calls)

### ESLint

- Using Next.js recommended configuration
- Runs automatically on pre-commit via Husky
- Fix issues before committing: `npm run format`

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `chore/description` - Maintenance tasks

### Commit Message Convention

```text
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**

```text
feat(auth): add Google OAuth provider
fix(ui): resolve dark mode toggle animation
docs(readme): update setup instructions
```

## Pull Request Process

### Before Creating PR

1. **Update from main**: `git pull origin main`
2. **Run linter**: `npm run lint`
3. **Run formatter**: `npm run format`
4. **Check type errors**: `npm run build`
5. **Test your changes**: `npm run dev`

### PR Template

Include the following information:

- **Description of changes**
- **Related issue number** (if applicable)
- **Screenshots** (for UI changes)
- **Testing done**
- **Breaking changes** (if any)

### Review Process

- All PRs require review
- Address feedback promptly
- Keep PRs focused and small
- Respond to review comments

## Database Guidelines

### Prisma Schema

- Use descriptive model names
- Add comments for complex fields
- Use appropriate field types
- Define relationships clearly

### Database Workflow

**Development:**

```bash
# Push schema changes (development only)
npm run db:push

# Open Prisma Studio for database management
npm run db:studio
```

**Production (when ready):**

```bash
# Create migration
npm run db:migrate

# Apply migrations
npm run db:migrate deploy
```

**Schema Introspection:**

```bash
# Introspect existing database
npx prisma db pull

# Generate Prisma Client after schema changes
npm run db:generate
```

**Important Notes:**

- Never edit generated migration files
- Test migrations locally before pushing
- Use descriptive migration names
- Regular introspection recommended to keep schema in sync

## Authentication & Authorization

### Better-Auth Setup

- Server instance in `lib/auth.ts`
- Client instance in `lib/auth-client.ts`
- API routes at `/api/auth/*`

### Adding OAuth Providers

1. Update `lib/auth.ts` with provider configuration
2. Add credentials to `.env`
3. Test locally before creating PR

## UI Component Development

### Using shadcn/ui

```bash
# Install new components
npx shadcn@latest add [component-name]

# Components are added to src/components/ui/
# You own the code - customize as needed
```

### Theming

- Dark mode configured via `ThemeProvider`
- CSS variables defined in `globals.css`
- Use `dark:` prefix for dark mode styles

### CVA Patterns

```typescript
const variants = cva('base-classes', {
  variants: {
    variant: {
      default: 'classes',
      secondary: 'classes',
    },
  },
});
```

**Note**: Manually order Tailwind classes in CVA calls - Prettier plugin doesn't handle this.

## Testing

Testing strategy and conventions will be added as the project matures.

## Troubleshooting

### Common Issues

#### Database Connection Errors

- Check `DATABASE_URL` format
- Verify MySQL is running
- Test connection with `npm run db:studio`

#### Prisma Client Errors

- Run `npm run db:generate`
- Restart dev server

#### Build Errors

- Clear `.next` folder
- Clear Turborepo cache: `npx turbo clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`

#### Styling Issues

- Verify Tailwind import in `globals.css`
- Check PostCSS configuration
- Restart dev server for CSS changes

#### Authentication Issues

- Verify `BETTER_AUTH_SECRET` is set
- Check `BETTER_AUTH_URL` matches your development URL
- Ensure API routes are accessible

#### TanStack Query Issues

- Ensure `HydrationBoundary` wraps prefetched data
- Check `staleTime` configuration in QueryClient
- Verify `@tanstack/react-query-devtools` is installed
- Use `getQueryClient()` for server-side prefetching
- Ensure proper `queryKey` usage and invalidation

## Getting Help

- Check existing issues and discussions
- Search project documentation
- Ask in community channels
- Create detailed issue reports with reproduction steps

## Recognition

Contributors will be recognized in the project documentation and community channels.

---

Thank you for contributing to the Sin City Programmers Job Board!
