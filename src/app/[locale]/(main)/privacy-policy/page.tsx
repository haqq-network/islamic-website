import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/pages/privacy-policy-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { SupportedLocales } from '@/types';
import { getPrivacyPolicyContentFromFalconer } from '@/utils/get-privacy-policy';

const title = 'Privacy Policy';

export const metadata: Metadata = {
  title,
  openGraph: {
    title: `${title} | IslamicCoin`,
    images: islamicOpenGraphImages,
    url: new URL('/privacy-policy', DEPLOY_URL).toString(),
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const privacyPolicy = await getPrivacyPolicyContentFromFalconer(locale);

  return <PrivacyPolicyPage privacyPolicy={privacyPolicy} />;
}
