import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import type { Metadata } from 'next';

const title = 'Recruitment Fraud Alert';
const description =
  'Learn how to identify and protect yourself against recruitment scams claiming to be from Islamic Coin. Know the red flags and stay secure in your job search.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/fraud-alert', DEPLOY_URL).toString(),
  },
};

export { FraudAlertPage as default } from '@/components/pages/fraud-alert-page';
