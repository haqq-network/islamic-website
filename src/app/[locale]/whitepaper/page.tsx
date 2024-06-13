import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { getWhitepaperContentFromFalconer } from '@/utils/get-whitepaper';
import { SupportedLocales } from '@/types';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { WhitepaperPage } from '@/components/pages/whitepaper-page';

const title = 'Whitepaper';
const description =
  'The blueprint for a harmonious meld of Islamic finance and blockchain. Delve deep into the vision and strategies steering HAQQ and Islamic Coin.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/whitepaper', DEPLOY_URL).toString(),
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const whitepaper = await getWhitepaperContentFromFalconer(locale);

  return <WhitepaperPage whitepaper={whitepaper} />;
}
