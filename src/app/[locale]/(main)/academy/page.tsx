import type { Metadata } from 'next';
import { AcademyPreviewPage } from '@/components/pages/academy-preview-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';

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

export default function AcademyPage() {
  return <AcademyPreviewPage />;
}
