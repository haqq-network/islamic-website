import type { Metadata } from 'next';
import { CommunityHubPage } from '@/components/pages/community-hub-page';
import { DEPLOY_URL } from '@/constants';
import { islamicOpenGraphImages } from '@/lib/shared-metadata';
import { SOCIAL_LINKS } from '@/lib/social-links';

const title = 'Community hub';
const description =
  'Join a vibrant community committed to ethical finance. Engage in conversations, share knowledge, and foster connections within the Islamic Coin network.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | IslamicCoin`,
    description,
    images: islamicOpenGraphImages,
    url: new URL('/community-hub', DEPLOY_URL).toString(),
  },
};

export default async function Page() {
  return <CommunityHubPage socialLinks={SOCIAL_LINKS} />;
}
