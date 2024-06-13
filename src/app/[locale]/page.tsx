import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { getChainStatsFromFalconer } from '@/utils/get-chain-stats-data';
import { getHomePageDataFromFalconer } from '@/utils/get-home-page-data';
import { getWalletRatings } from '@/utils/get-wallet-ratings';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { MainPage } from '@/components/pages/main-page/main-page';
import { SupportedLocales } from '@/types';

const title = 'IslamicCoin';
const description =
  'Your gateway to a Shariah-compliant decentralized world. Islamic Coin stands at the vanguard of ethical digital finance.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: islamicOpenGraphImages,
    locale: 'en',
    url: new URL(DEPLOY_URL).toString(),
    type: 'website',
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const stats = await getChainStatsFromFalconer();
  const { news, advisoryMembers, executiveMembers, shariahMembers } =
    await getHomePageDataFromFalconer(locale);
  const storeRatings = await getWalletRatings();

  return (
    <MainPage
      stats={stats}
      news={news}
      advisoryMembers={advisoryMembers}
      executiveMembers={executiveMembers}
      shariahMembers={shariahMembers}
      storeRatings={storeRatings}
    />
  );
}
