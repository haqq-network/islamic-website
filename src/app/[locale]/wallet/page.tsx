import type { Metadata } from 'next';
import { WalletPage } from '@/components/pages/wallet-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { getWalletRatings } from '@/utils/get-wallet-ratings';

const title = 'Wallet';
const description =
  'Seamlessly manage your Shariah-compliant assets. Tailored for the discerning investor in the digital age.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/wallet', DEPLOY_URL).toString(),
  },
};

export default async function Page() {
  const storeRatings = await getWalletRatings();

  return <WalletPage storeRatings={storeRatings} />;
}
