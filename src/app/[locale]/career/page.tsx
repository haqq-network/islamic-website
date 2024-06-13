import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';

const title = 'Career';
const description =
  'Join a team bridging Islamic finance and cutting-edge blockchain technology. Shape the future with us.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/career', DEPLOY_URL).toString(),
  },
};

export { CareerPage as default } from '@/components/pages/career-page';
