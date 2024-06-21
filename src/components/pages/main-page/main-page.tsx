import { Fragment } from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Marquee } from '@/components/ui/marquee';
import { Member } from '@/components/ui/member-card';
import { MoonAnimatedBg } from '@/components/ui/moon-animated-background';
import { NewsPost } from '@/types';
import { ChainStats } from '@/utils/get-chain-stats-data';
import { BoardMembersBlock } from './board-members-block';
import { FinanceBlock } from './finance-block';
import { FundsBlock } from './funds-block';
import { HeroBlock } from './hero-block';
import { JoinCommunityBlock } from './join-community-block';
import { LearnAndGrowBlock } from './learn-and-grow-block';
import { NewsBlock } from './news-block';
import { WhyBlock } from './why-block';

const WalletBlock = dynamic(
  async () => {
    const { WalletBlock } = await import('./wallet-block');
    return { default: WalletBlock };
  },
  { ssr: false },
);

export function MainPage({
  news,
  advisoryMembers,
  shariahMembers,
  executiveMembers,
  stats,
  storeRatings,
}: {
  news?: NewsPost[];
  advisoryMembers: Member[];
  shariahMembers: Member[];
  executiveMembers: Member[];
  stats: ChainStats;
  storeRatings: {
    appStore: number;
    googlePlay: number;
  };
}) {
  return (
    <Fragment>
      <Hero stats={stats} />
      <FundsBlock />
      <FinanceBlock />
      <NewsBlock news={news} />
      <BoardMembersBlock
        executiveMembers={executiveMembers}
        shariahMembers={shariahMembers}
        advisoryMembers={advisoryMembers}
      />
      <WalletBlock storeRatings={storeRatings} />
      <LearnAndGrowBlock />
      <JoinCommunityBlock />
    </Fragment>
  );
}

function Hero({ stats }: { stats: ChainStats }) {
  const t = useTranslations('index-page.hero-block');

  return (
    <div className="overflow-x-clip">
      <MoonAnimatedBg
        className={clsx(
          'translate-x-[37%] translate-y-[-21.3%]',
          'md:translate-x-1/2 md:translate-y-[-16.1%]',
          'lg:translate-y-[-23.45%]',
          'xl:translate-y-[-24.9%]',
          'min-[1440px]:translate-y-[-23.8%]',
        )}
      />
      <Container>
        <HeroBlock />

        <Marquee className="my-[80px] md:my-[100px] xl:mt-[140px]">
          {t('running-text').toLocaleUpperCase()}
        </Marquee>

        <WhyBlock stats={stats} />
      </Container>
    </div>
  );
}
