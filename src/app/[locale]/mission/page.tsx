import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';

const title = 'Mission';
const description =
  'On a mission to onboard the global Muslim community to digital finance without compromising Islamic values.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/mission', DEPLOY_URL).toString(),
  },
};

export { MissionPage as default } from '@/components/pages/mission-page';
