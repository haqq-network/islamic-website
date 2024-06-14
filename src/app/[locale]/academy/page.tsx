import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { AcademyPreviewPage } from '@/components/pages/academy-preview-page';

const title = 'Academy';
const description =
  'Dive into a world of knowledge. Explore comprehensive guides on Shariah-compliant financial practices and blockchain integration.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/academy', DEPLOY_URL).toString(),
  },
};

export default async function Page() {
  return <AcademyPreviewPage />;
}
