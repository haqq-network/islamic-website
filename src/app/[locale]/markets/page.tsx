import type { Metadata } from 'next';
import { MarketsPage } from '@/components/pages/markets-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { SupportedLocales } from '@/types';
import { getPriceFromFalconer } from '@/utils/get-price';
import { createCurrencyFormatter } from '@/utils/locale-utils';

const title = 'Markets';
const description = '';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/markets', DEPLOY_URL).toString(),
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const price = await getPriceFromFalconer();
  const formatter = createCurrencyFormatter(locale);

  return <MarketsPage price={formatter.format(price)} />;
}
