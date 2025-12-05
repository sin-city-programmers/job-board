# Auth Contract

This document defines the “auth contract” that other teams can rely on while the NestJS + Prisma implementation is being built. Treat it as the single source of truth for interfaces, dependencies, and expectations.

## 1. Baseline Audit & Goals

### Workspace snapshot
- Nx monorepo rooted at `/Users/christopherperet/code_projects/webapps/job-board` with two apps: `apps/api` (Nest 11 scaffold) and `apps/web` (Next 16). Shared lint/test tooling is already wired up through Nx.
- Local data stack is MySQL 8.0 via `docker/docker-compose.yml`, seeded with credentials from `docker/.env` (see `README.md` and `docs/DATABASE.md`).
- UX/product references already exist in `docs/workflow-diagrams`. We are pivoting to passwordless magic-link login as the sole entry point for now; OAuth providers remain future expansion.

### Goals
1. Give every squad stable contracts (schema + endpoints + roles) so they can stub their work without blocking on implementation.
2. Anchor security assumptions early (session transport, link signing, audit trails).
3. Keep the scope minimal yet realistic: Nest REST APIs, Prisma ORM, Dockerized MySQL, email-based magic links, and dummy authorization tiers for now.

### Non-goals
- Implementing UI flows or full RBAC. The focus is purely the documented contract plus lightweight mocks.
- Supporting username/password auth in v1—passwordless magic links are the only path for now (social OAuth later).
- Multi-region or multi-tenant infrastructure specifics.

## 2. Architecture & Dependencies

### Module layout (Nest, under `apps/api/src/app`)
| Module                       | Responsibilities                                                                          | Key Providers                                                                           |
| ---                          | ---                                                                                       | ---                                                                                     |
| `PrismaModule`               | Instantiates `PrismaService`, manages lifecycle hooks, exposes transaction helpers.       | `PrismaService`, logging interceptor                                                    |
| `UsersModule`                | User lookup/upsert, company membership hydration, role resolution.                        | `UsersService`, `UserRepository`                                                        |
| `AuthModule`                 | Magic-link issuance/consumption, session guard, controller for `/auth/*`, cookie helpers. | `AuthService`, `MagicLinkService`, `SessionService`, `AuthController`                   |
| `OrgsModule` (optional stub) | Exposes company/org read models needed by onboarding, piggybacks off `CompanyMembership`. | `OrgService`                                                                            |

Generated structure example:
```
apps/api/src/app/
  prisma/
    prisma.module.ts
    prisma.service.ts
  users/
    users.module.ts
    users.service.ts
    users.repository.ts
  auth/
    auth.module.ts
    auth.controller.ts
    auth.service.ts
    magic-link/
      magic-link.service.ts
    guards/session.guard.ts
```

### Library & tooling stack
- `prisma` CLI + `@prisma/client` (ORM).
- Email helpers: `@nestjs-modules/mailer` (prod), `nodemailer`, or mocked adapters for dev.
- Session/JWT helpers: `@nestjs/jwt`, `cookie` (server-side serialization), `@nestjs/config`.
- Passwordless secrets: `rand-token` or `crypto` for opaque session IDs.
- Testing: `@nestjs/testing`, `supertest`, and Prisma TestUtils (lightweight factory) for contract tests.

### Environment variables
| Variable                                                                     | Source                                                               | Usage                                       |
| ---                                                                          | ---                                                                  | ---                                         |
| `DATABASE_URL`                                                               | Derived from `docker/.env` (`mysql://user:pass@host:port/db`)        | Prisma Client + migrations                  |
| `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` | `docker/.env` fallback                                               | Legacy TypeORM replacements + health checks |
| `SESSION_SECRET`                                                             | 32+ char random string                                               | Cookie signing + JWT fallback               |
| `API_BASE_URL`                                                               | e.g., `http://localhost:3000/api`                                    | Next.js server actions                      |
| `WEB_ORIGIN`                                                                 | e.g., `http://localhost:4200` or Next dev URL                        | CORS + redirect allow list                  |
| `MAGIC_LINK_TTL_MINUTES`                                                     | `.env` (default 15)                                                  | Token expiration window                     |
| `MAGIC_LINK_FROM_EMAIL`                                                      | Secret manager                                                       | Outgoing email From header                  |
| `EMAIL_PROVIDER_API_KEY`                                                     | Secret manager                                                       | Transactional email vendor credential       |

### Request lifecycle (high level)
1. Next.js (or a server action) calls `POST /api/auth/magic-link/request` with the user’s email + desired redirect target.
2. The API stores a `MagicLinkToken`, queues an email via the transactional provider, and returns a `devToken` in non-production environments for local testing.
3. When the user clicks the link, the web app invokes `POST /api/auth/magic-link/consume` with the token; the API validates it, issues a session, and sets an `HttpOnly` cookie.
4. Subsequent API calls pass through `SessionGuard` (reads cookie → loads session+user via Prisma). Dummy roles (`USER`, `ORG_USER`, `ADMIN`) are exposed to downstream guards.

## 3. Data Model & Prisma Contract

Create `prisma/schema.prisma` with MySQL datasource + generator. Core models:

```prisma
enum AuthRole {
  USER      // default personal account
  ORG_USER  // user extended to org context
  ADMIN     // elevated admin tooling
}

model User {
  id                String        @id @default(cuid())
  email             String        @unique
  firstName         String
  lastName          String
  avatarUrl         String?       @db.VarChar(512)
  role              AuthRole      @default(USER)
  accounts          Account[]
  memberships       CompanyMembership[]
  sessions          Session[]
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

model Account {
  id                String   @id @default(cuid())
  userId            String
  provider          String   // google, linkedin
  providerAccountId String   // Provider subject (future OAuth or SSO)
  accessToken       String?
  refreshToken      String?
  expiresAt         DateTime?
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id            String   @id @default(cuid())
  userId        String
  roleAtLogin   AuthRole
  ipAddress     String?
  userAgent     String?
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId, expiresAt])
}

model CompanyMembership {
  id            String   @id @default(cuid())
  userId        String
  companyId     String
  orgRole       String   // e.g. OWNER, MEMBER
  createdAt     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([companyId])
}

model MagicLinkToken {
  id         String   @id @default(cuid())
  email      String
  token      String   @unique
  userId     String?
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  expiresAt  DateTime
  consumedAt DateTime?
  createdAt  DateTime @default(now())
  @@index([email])
}
```

### Migration workflow
1. Install tooling: `npx nx run api:prisma-generate` (custom target) or directly `npx prisma generate`.
2. Create migration: `npx prisma migrate dev --name init-auth --schema prisma/schema.prisma`.
3. Apply migrations inside Docker MySQL: `DATABASE_URL="mysql://job_board_user:devpassword123@127.0.0.1:3306/job_board" npx prisma migrate deploy`.
4. Seed script (`prisma/seed.ts`) should insert:
   - One dummy `USER`, one `ORG_USER`, and one `ADMIN` account to unblock FE.
   - Example company + membership rows to mirror `docs/wireframes` flows.
   - Optional `MagicLinkToken` rows for smoke-testing (or rely on runtime creation logic).

Document every schema change in `docs/DATABASE.md` (append a changelog section) so DevOps can follow along.

## 4. API Surface & Contracts

Inter-service prefix: `/api/auth`. All responses JSON, with `Set-Cookie` headers where applicable. Guard stack: `SessionGuard` (reads session cookie), `RolesGuard` (checks `AuthRole`), `OrgContextGuard` (ensures membership when `ORG_USER` scopes apply).

| Endpoint                                 | Method | Auth Needed    | Request Shape                                         | Response Shape                                                | Notes                                                                                   |
| ---                                      | ---    | ---            | ---                                                   | ---                                                           | ---                                                                                     |
| `/api/auth/magic-link/request`           | POST   | None           | Body `{ email: string, redirectUrl?: string }`        | `{ status, expiresAt, previewUrl?, devToken? }`               | Creates a single-use magic link and queues email. `devToken` only returned in non-prod. |
| `/api/auth/magic-link/consume`           | POST   | None           | Body `{ token: string }`                              | `{ session: {...}, redirectUrl }` + `Set-Cookie: sb_session`  | Validates token, establishes session, optionally redirects to provided URL.             |
| `/api/auth/session`                      | GET    | Session cookie | Headers: `Cookie: sb_session=...`                     | `{ user: {...}, role: 'ORG_USER', memberships: [...] }`       | Used by Next.js server components to hydrate user context.                              |
| `/api/auth/logout`                       | POST   | Session cookie | Body optional `{ allDevices?: boolean }`              | `204 No Content` + cleared cookie                             | When `allDevices=true`, cascade delete all sessions for the user.                       |
| `/api/auth/token/refresh`                | POST   | Session cookie | Body empty                                            | `{ sessionId, expiresAt }` + rotated cookie                   | Rotates session expiration without re-auth.                                             |
| `/api/admin/users`                       | GET    | `ADMIN`        | Query `search`, `role`, pagination                    | `{ items: [...], pageInfo: {...} }`                           | Enables admin UI workstreams to proceed.                                                |
| `/api/orgs/memberships`                  | GET    | `ORG_USER`     | Query `companyId`                                     | `{ memberships: [...] }`                                      | Provides membership roster to company dashboard.                                        |

### Error taxonomy
- `401 UNAUTHORIZED`: missing/invalid session cookie.
- `403 FORBIDDEN`: session valid but lacks required `AuthRole` or membership.
- `422 UNPROCESSABLE ENTITY`: malformed magic-link request/consume payload.
- `429 TOO MANY REQUESTS`: optional future-proofing for brute-force detection.
- `500 INTERNAL SERVER ERROR`: include `requestId` header for correlation; log via Nest interceptors.

### Middleware/guards
- `CsrfCookieMiddleware`: sets a double-submit token for POST endpoints (Next.js should echo header `x-csrf-token`).
- `SessionGuard`: loads Prisma `Session` + `User`. If expired, deletes row and clears cookie.
- `RolesGuard`: compares `user.role` and optional `session.roleAtLogin` vs endpoint metadata (e.g., `@Roles(AuthRole.ADMIN)`).

### Local dummy contract behavior
- `nx serve api` now exposes stubbed endpoints so FE can hit `/api/auth/*` without a real DB.
- `POST /api/auth/magic-link/request` responds with a `devToken` (only in non-prod) that can immediately be passed to `/api/auth/magic-link/consume`—treat it as the email link.
- Send `x-demo-role: USER|ORG_USER|ADMIN` or `x-demo-user: user-basic|user-org|user-admin` headers (or query params) to toggle personas; default is the base user.
- Session cookies (`sb_session`) are opaque, auto-generated strings—treat them as disposable fixtures that only verify shape.
- Guards throw the documented `401/403` responses even in dummy mode, so the UI can test access fencing.

## 5. Front-End Integration Notes

### Data fetching patterns (`apps/web`)
- **Server Components / Route Handlers**: Use `cookies().get('sb_session')` (Next 16 API) and call internal helpers (`lib/auth/getSession.ts`) that hit `/api/auth/session`. Prefer server actions for onboarding flows needing sensitive data.
- **Client Components**: Hydrate from React Query store seeded by server data; revalidate via `/api/auth/session` on focus. If session 401s, route to `/login`.
- **Mock helpers**: Provide `mocks/authSession.ts` that returns stubbed responses for each dummy role so designers can toggle UI states.
- **Magic-link request flow**: Implement a server action (`app/(auth)/login/actions.ts`) that calls `/api/auth/magic-link/request`, surfaces “link sent” UI, and in dev mode displays the returned `devToken` so QA can click immediately.

### Role-aware UX checklist
1. Base (USER): landing page, personal dashboard, job browsing (`docs/wireframes/core-job-browsing...`).
2. Org extension (ORG_USER): unlock company dashboard, invites, job posting.
3. Admin extension (ADMIN): moderation + system metrics; ensure admin-only navigation respects `AuthRole`.

Create a shared TypeScript type in `apps/web/src/types/auth.ts` mirroring the contract:
```ts
export type AuthRole = 'USER' | 'ORG_USER' | 'ADMIN';
export interface SessionPayload {
  user: { id: string; email: string; firstName: string; lastName: string; avatarUrl?: string };
  role: AuthRole;
  memberships: Array<{ companyId: string; orgRole: string }>;
  expiresAt: string;
}
```

### Operational notes
- Configure Next.js `.env.local` with the same magic-link email provider credentials (or local dev secrets) to keep local/preview parity.
- When the backend isn’t ready, FE can point `API_BASE_URL` to `http://localhost:3333` and run `nx run api:serve-mocks` (simple Nest controller returning canned payloads).
- QA checklist: session expiration, logout all devices, role toggling, membership gating, magic-link failure states (invalid token, expired token).

### Walkthrough video 
Walk through video: [highly informative auth deep-dive](https://youtu.be/Tay53Xp8BzU?si=8Nn-BSM7U9weHTnr). (REQUIRED.)

---
With this contract in place, teams can scaffold repositories, seeds, and feature flags without waiting on the actual Nest + Prisma implementation. Update this doc whenever schema or endpoint assumptions shift.

