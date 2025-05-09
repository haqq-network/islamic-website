'use client';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePostHog } from 'posthog-js/react';
import bgImgData from '@/assets/images/wallet-bg.webp';
import phoneImgData from '@/assets/images/wallet-iphone-screenshot.webp';
import { Container } from '@/components/ui/container';
import { RatingBadge } from '@/components/ui/rating-badge';
import { Text } from '@/components/ui/text';
import {
  WalletDownloadButton,
  WalletDownloadWithQrButton,
} from '@/components/ui/wallet-download-button';
import {
  STORE_RATINGS,
  WALLET_LINK_APPLE,
  WALLET_LINK_GOOGLE,
} from '@/constants';
import { getDynamicLink } from '@/utils/get-dynamic-link';

export function WalletPage() {
  const t = useTranslations('wallet-page');
  const posthog = usePostHog();
  const distinctId = posthog.get_distinct_id();

  if (!distinctId) {
    return null;
  }

  const appStoreLink = getDynamicLink(
    'https://haqq.network/wallet',
    distinctId,
    WALLET_LINK_APPLE,
  );
  const playMarketLink = getDynamicLink(
    'https://haqq.network/wallet',
    distinctId,
    WALLET_LINK_GOOGLE,
  );

  const content = (
    <Fragment>
      <h1 className="text-[46px] font-[600] leading-[52px] md:text-[80px] md:leading-none lg:text-[80px] lg:leading-none">
        <span className="bg-gradient-to-r from-[#36FFF3] to-[#18FFAC] bg-clip-text text-transparent">
          {t('title.gradient-text')}
        </span>{' '}
        {t('title.white-text')}
      </h1>
      <Text isMono className="mt-[24px] md:mt-[40px]">
        {t('subtitle')}
      </Text>
      <div className="mt-[20px] max-w-[600px] text-[13px] md:mt-[24px] md:text-[16px] lg:text-[#F5F5F580]">
        {t('text')}
      </div>

      <div className="mt-[24px] flex gap-x-[24px] md:mt-[36px] md:gap-x-[38px]">
        <div className="flex flex-col gap-y-[6px]">
          <span className="text-[10px] uppercase leading-[16px] text-white/50 ltr:font-vcr rtl:font-handjet">
            {t('stores.app-store')}
          </span>
          <RatingBadge rating={STORE_RATINGS.appStore} />
        </div>
        <div className="flex flex-col gap-y-[6px]">
          <span className="text-[10px] uppercase leading-[16px] text-white/50 ltr:font-vcr rtl:font-handjet">
            {t('stores.google-play')}
          </span>
          <RatingBadge rating={STORE_RATINGS.googlePlay} />
        </div>
      </div>

      <div className="hidden lg:mt-[24px] lg:flex lg:flex-row lg:flex-wrap lg:gap-[16px]">
        <div className="w-fit">
          <Link
            href={appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            data-attr="download-ios"
          >
            <WalletDownloadWithQrButton
              type="apple"
              title={t('stores.download-button.title')}
              link={appStoreLink}
            />
          </Link>
        </div>
        <div className="w-fit">
          <Link
            href={playMarketLink}
            target="_blank"
            rel="noopener noreferrer"
            data-attr="download-android"
          >
            <WalletDownloadWithQrButton
              type="google"
              title={t('stores.download-button.title')}
              link={playMarketLink}
            />
          </Link>
        </div>
        <div className="w-fit">
          <Link
            href="https://github.com/haqq-network/haqq-wallet/releases/latest/download/haqq.apk"
            target="_blank"
            rel="noopener noreferrer"
            download
            data-attr="download-apk"
          >
            <WalletDownloadButton type="apk" />
          </Link>
        </div>
      </div>

      <div className="mt-[28px] flex flex-col gap-y-[20px] lg:hidden">
        <Link
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          data-attr="download-ios"
        >
          <WalletDownloadButton
            type="apple"
            title={t('stores.download-button.title')}
          />
        </Link>

        <Link
          href={playMarketLink}
          target="_blank"
          rel="noopener noreferrer"
          data-attr="download-android"
        >
          <WalletDownloadButton
            type="google"
            title={t('stores.download-button.title')}
          />
        </Link>

        <div className="w-fit">
          <Link
            href="https://github.com/haqq-network/haqq-wallet/releases/latest/download/haqq.apk"
            target="_blank"
            rel="noopener noreferrer"
            download
            data-attr="download-apk"
          >
            <WalletDownloadButton type="apk" />
          </Link>
        </div>
      </div>

      <div className="mt-[24px] text-[13px] leading-[20px] md:text-[16px] lg:text-[#F5F5F580]">
        You can find more supported wallets{' '}
        <Link
          href="https://docs.haqq.network/user-guides/wallet/"
          target="__blank"
          className="cursor-pointer underline transition-colors duration-150 ease-out hover:text-white/75"
        >
          here
        </Link>
        .
      </div>
    </Fragment>
  );

  const image = (
    <div className="pointer-events-none select-none">
      <div className="absolute left-[-140px] top-[-60px] z-[-1] h-[600px] w-[600px]">
        <Image src={bgImgData} alt="" priority />
      </div>
      <Image src={phoneImgData} alt="" fill priority />
    </div>
  );

  return (
    <section>
      <Container className="relative mt-[32px] overflow-x-clip pb-[60px] text-white md:mt-[52px] lg:mt-[68px] lg:pb-[130px] xl:pb-[108px]">
        <div className="hidden items-center justify-between lg:flex lg:gap-x-[24px] xl:gap-x-[60px]">
          <div className="flex max-w-[600px] flex-col xl:max-w-[660px]">
            {content}
          </div>
          <div className="flex flex-1 justify-center lg:min-w-[540px] lg:max-w-[540px]">
            <div className="relative h-[600px] w-[350px]">{image}</div>
          </div>
        </div>
        <div className="flex flex-col lg:hidden">
          {content}
          <div className="relative mt-[48px] h-[600px] w-[350px] self-center">
            {image}
          </div>
        </div>
      </Container>
    </section>
  );
}
