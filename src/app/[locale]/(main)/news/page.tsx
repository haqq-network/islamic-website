import type { Metadata } from 'next';
import { NewsPage } from '@/components/pages/news-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { getNewsPageContentFromFalconer } from '@/utils/get-news';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const title = 'News';
const description =
  'Stay in the loop with the latest breakthroughs, announcements, and milestones from Islamic Coin.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/news', DEPLOY_URL).toString(),
  },
};

export default async function Page() {
  const news = await getNewsPageContentFromFalconer();

  return <NewsPage news={news} />;
}
