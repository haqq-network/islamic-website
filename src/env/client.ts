import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_TURNSTILE_SITEKEY: z.string().min(3),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(3).optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(3).optional(),
    NEXT_PUBLIC_GIT_COMMIT_SHA: z.string().min(3).optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TURNSTILE_SITEKEY: process.env['NEXT_PUBLIC_TURNSTILE_SITEKEY'],
    NEXT_PUBLIC_POSTHOG_HOST: process.env['NEXT_PUBLIC_POSTHOG_HOST'],
    NEXT_PUBLIC_POSTHOG_KEY: process.env['NEXT_PUBLIC_POSTHOG_KEY'],
    NEXT_PUBLIC_GIT_COMMIT_SHA:
      process.env['GIT_COMMIT_SHA'] ??
      process.env['NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA'] ??
      process.env['VERCEL_GIT_COMMIT_SHA'] ??
      'dev',
  },
});
