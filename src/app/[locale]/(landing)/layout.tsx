import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { DEPLOY_URL } from '@/constants';
import { PHProvider } from '@/providers/posthog';

export const metadata: Metadata = {
  title: {
    template: '%s | IslamicCoin',
    default: 'IslamicCoin',
  },
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL(DEPLOY_URL),
  other: {
    google: 'notranslate',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 2,
  width: 'device-width',
};

const PostHogPageView = dynamic(
  async () => {
    const { PostHogPageView } = await import(
      '@/components/ui/posthog-page-view'
    );
    return { default: PostHogPageView };
  },
  { ssr: false },
);

const IdentifyWalletUsers = dynamic(
  async () => {
    const { IdentifyWalletUsers } = await import(
      '@/components/ui/identify-wallet-users'
    );
    return { default: IdentifyWalletUsers };
  },
  { ssr: false },
);

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <html dir="ltr" translate="no">
      <PHProvider>
        <body>
          <PostHogPageView />
          <IdentifyWalletUsers />

          {children}

          {/* <AnalyticsAndScripts /> */}
        </body>
      </PHProvider>
    </html>
  );
}
