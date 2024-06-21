export const VERCEL_ENV = process.env['VERCEL_ENV'];
export const SITE_URL = 'https://islamiccoin.net';
export const DEPLOY_URL =
  VERCEL_ENV === 'production'
    ? SITE_URL
    : process.env['VERCEL_URL']
      ? `https://${process.env['VERCEL_URL']}`
      : process.env['NEXT_PUBLIC_VERCEL_URL']
        ? `https://${process.env['NEXT_PUBLIC_VERCEL_URL']}`
        : 'http://localhost:3000';
export const REVALIDATE_TIME = 300;
export const FALCONER_ENDPOINT = 'https://falconer.haqq.sh' as const;
export const SUPPORTED_LOCALES: string[] = ['en'];
export const DEFAULT_LOCALE = 'en';
export const BLOCKED_COUNTRY = 'AE';
export const WALLET_LINK_APPLE =
  'https://apps.apple.com/app/haqq-wallet-by-bored-gen/id6443843352';
export const WALLET_LINK_GOOGLE =
  'https://play.google.com/store/apps/details?id=com.haqq.wallet';
