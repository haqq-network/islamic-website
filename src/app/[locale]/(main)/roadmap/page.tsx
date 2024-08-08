import type { Metadata } from 'next';
import { RoadmapPage } from '@/components/pages/roadmap-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { SupportedLocales } from '@/types';
import { getRoadmapContentFromFalconer } from '@/utils/get-roadmap';

const title = 'Roadmap';
const description =
  'Chart the evolution of Islamic Coin as we pioneer the melding of Islamic traditions with blockchain technology.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/roadmap', DEPLOY_URL).toString(),
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const roadmap = await getRoadmapContentFromFalconer(locale);

  return <RoadmapPage roadmap={roadmap} />;
}
