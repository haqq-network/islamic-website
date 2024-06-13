import type { Metadata } from 'next';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { getFatwaContentFromFalconer } from '@/utils/get-fatwa';
import { getMembersContentFromFalconer } from '@/utils/get-members';
import { ShariahPage } from '@/components/pages/shariah-page';
import { SupportedLocales } from '@/types';

const title = 'Shariah';
const description =
  'Our steadfast commitment to Shariah principles provides an ethical foundation for modern digital finance. Dive into our adherence to Islamic traditions.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/shariah', DEPLOY_URL).toString(),
  },
};
export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const [fatwa, members] = await Promise.all([
    await getFatwaContentFromFalconer(locale),
    await getMembersContentFromFalconer(locale),
  ]);

  return (
    <ShariahPage
      fatwa={fatwa}
      locale={locale}
      shariahMembers={members?.shariahMembers ?? []}
      advisoryMembers={members?.advisoryMembers ?? []}
      executiveMembers={members?.executiveMembers ?? []}
    />
  );
}
