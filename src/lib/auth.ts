import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: {
    // We'll configure this with Prisma later
    provider: 'mysql',
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    // OAuth providers will be configured later by the backend team
    // This is just the boilerplate structure
  },
  plugins: [
    nextCookies(), // Required for Next.js server actions
  ],
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
});
