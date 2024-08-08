import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';

const title = 'Our Values';
const description =
  'Discover the heart of Islamic Coin. At the crossroads of Islamic traditions and innovation, we champion a future where ethics take center stage.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/values', DEPLOY_URL).toString(),
  },
};

export { ValuesPage as default } from '@/components/pages/values-page';
