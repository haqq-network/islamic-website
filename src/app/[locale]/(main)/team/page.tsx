import type { Metadata } from 'next';
import { TeamPage } from '@/components/pages/team-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { SupportedLocales } from '@/types';
import { getMembersContentFromFalconer } from '@/utils/get-members';

const title = 'Team';
const description =
  'Get to know the dedicated individuals propelling Islamic Coin towards harmonizing Islamic finance with blockchain.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/team', DEPLOY_URL).toString(),
  },
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: SupportedLocales };
}) {
  const { teamMembers, founderMembers } =
    await getMembersContentFromFalconer(locale);

  return <TeamPage team={teamMembers} founders={founderMembers} />;
}
