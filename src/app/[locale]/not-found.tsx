import type { Metadata } from 'next';
import { NotFound } from '@/components/ui/not-found-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';

const title = 'Not Found';

export const metadata: Metadata = {
  title,
  openGraph: {
    title: `${title} | IslamicCoin`,
    url: new URL(DEPLOY_URL).toString(),
    images: islamicOpenGraphImages,
  },
};

export default async function Page() {
  return <NotFound />;
}
