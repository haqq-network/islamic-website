import type { Metadata } from 'next';
import { DubaiResidentDisclaimerPage } from '@/components/pages/dubai-residents-disclaimer-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { SupportedLocales } from '@/types';
import { getDisclaimerContentFromFalconer } from '@/utils/get-disclaimer';

const title = 'Dubai Residents Disclaimer';
const description = '';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/dubai-residents-disclaimer', DEPLOY_URL).toString(),
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const disclaimer = await getDisclaimerContentFromFalconer(locale);

  return <DubaiResidentDisclaimerPage disclaimer={disclaimer} />;
}
