'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { getDynamicLink } from '@/utils/get-dynamic-link';

export default function JumptaskLandingPage() {
  const posthog = usePostHog();
  const distinctId = posthog.get_distinct_id();
  const searchParams = useSearchParams();
  const utmSource = searchParams.get('utm_source');
  const utmCampaign = searchParams.get('utm_campaign');
  const transactionId = searchParams.get('transaction_id');
  const userId = searchParams.get('user_id');
  const offerId = searchParams.get('offer_id');
  const { push } = useRouter();

  useEffect(() => {
    try {
      posthog.capture('jumptask landing view', {
        transaction_id: transactionId,
        user_id: userId,
        offer_id: offerId,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
      });

      const dynamicLink = getDynamicLink(
        'https://haqq.network/wallet',
        distinctId,
      );
      push(dynamicLink);
    } catch (error) {
      console.error('Error sending event or redirecting:', error);
    }
  }, [
    posthog,
    push,
    transactionId,
    userId,
    offerId,
    utmSource,
    utmCampaign,
    distinctId,
  ]);

  return null;
}
