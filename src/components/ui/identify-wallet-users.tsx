'use client';
import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

declare global {
  interface Window {
    ethereum?: { isHaqqWallet?: boolean };
    __HAQQWALLET__?: {
      POSTHOG_DISTINCT_ID?: string;
    };
  }
}

export function IdentifyWalletUsers() {
  const posthog = usePostHog();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isHaqqWallet = Boolean(window.ethereum?.isHaqqWallet);

      if (isHaqqWallet) {
        const walletDistinctId = window.__HAQQWALLET__?.POSTHOG_DISTINCT_ID;
        console.log('IdentifyWalletUsers', { walletDistinctId });

        posthog.identify(walletDistinctId ?? posthog.get_distinct_id());
      }
    }
  }, [posthog]);

  return null;
}
