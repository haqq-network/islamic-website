'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePostHog } from 'posthog-js/react';
import halfIphoneImgData from '@/assets/images/half-iphone.jpg';
import iphoneImgData from '@/assets/images/iphone.jpg';
import { Container } from '@/components/ui/container';
import { GradientText } from '@/components/ui/gradient-text';
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

export function WalletBlock() {
  const t = useTranslations('index-page');
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

  return (
    <section>
      <Container>
        <div className="mt-[108px] flex flex-col gap-y-[32px] text-white md:mt-[164px] lg:mt-[240px]">
          <h2 className="block text-[28px] font-[600] leading-[32px] md:text-[44px] md:leading-[48px] lg:hidden lg:text-[64px] lg:leading-[70px]">
            {t('portfolio-block.title.white-text.first')}
            <GradientText className="rtl:pb-[10px]">
              {t('portfolio-block.title.gradient-text')}
            </GradientText>
            {t('portfolio-block.title.white-text.second')}
          </h2>
          <div className="flex flex-col gap-x-[28px] gap-y-[32px] md:flex-row-reverse lg:gap-x-[36px] xl:gap-x-[54px] 2xl:gap-x-[64px]">
            <div className="pointer-events-none relative block h-[290px] select-none overflow-hidden rounded-[20px] bg-islamic-primary-graphite px-[42px] pt-[24px] md:hidden md:h-full md:px-[10px] md:pt-[32px]">
              <Image
                src={halfIphoneImgData}
                alt=""
                className="absolute left-1/2 top-[24px] w-[258px] translate-x-[-50%] translate-y-0 transform"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-center justify-between md:flex-row md:gap-x-[28px]">
              <div className="flex flex-col">
                <div className="hidden text-[28px] font-[600] leading-[32px] md:text-[44px] md:leading-[48px] lg:block lg:text-[64px] lg:leading-[70px]">
                  {t('portfolio-block.title.white-text.first')}
                  <GradientText className="rtl:pb-[10px]">
                    {t('portfolio-block.title.gradient-text')}
                  </GradientText>
                  {t('portfolio-block.title.white-text.second')}
                </div>
                <div className="lg:mt-[40px]">
                  <Text isMono>{t('portfolio-block.subtitle')}</Text>
                </div>
                <Text
                  size="small"
                  className="mt-[20px] text-white/50 md:mt-[24px]"
                >
                  {t('portfolio-block.text')}
                </Text>

                <div className="mt-[24px] flex gap-x-[24px] gap-y-[20px] min-[375px]:gap-x-[32px] md:mt-[36px]">
                  <div className="flex flex-col gap-y-[6px]">
                    <span className="font-vcr text-[10px] uppercase leading-[16px] text-white/50 rtl:font-handjet">
                      {t('portfolio-block.stores.app-store')}
                    </span>
                    <RatingBadge rating={STORE_RATINGS.appStore} />
                  </div>
                  <div className="flex flex-col gap-y-[6px]">
                    <span className="font-vcr text-[10px] uppercase leading-[16px] text-white/50 rtl:font-handjet">
                      {t('portfolio-block.stores.google-play')}
                    </span>
                    <RatingBadge rating={STORE_RATINGS.googlePlay} />
                  </div>
                </div>

                <div className="hidden lg:mt-[24px] lg:flex lg:flex-row lg:gap-x-[16px]">
                  <div className="w-fit">
                    <Link
                      href={appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-attr="download-ios"
                    >
                      <WalletDownloadWithQrButton
                        type="apple"
                        title={t(
                          'portfolio-block.stores.download-button.title',
                        )}
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
                        title={t(
                          'portfolio-block.stores.download-button.title',
                        )}
                        link={playMarketLink}
                      />
                    </Link>
                  </div>
                </div>
                <div className="mt-[20px] flex flex-col gap-y-[20px] lg:hidden">
                  <div>
                    <Link
                      href={appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-attr="download-ios"
                    >
                      <WalletDownloadButton
                        type="apple"
                        title={t(
                          'portfolio-block.stores.download-button.title',
                        )}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={playMarketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-attr="download-android"
                    >
                      <WalletDownloadButton
                        type="google"
                        title={t(
                          'portfolio-block.stores.download-button.title',
                        )}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none relative hidden w-1/2 select-none overflow-hidden rounded-[20px] bg-islamic-primary-graphite px-[42px] pt-[24px] md:block md:h-[480px] md:min-w-[280px] md:px-[10px] md:pt-[32px] lg:h-[648px] lg:min-w-[380px] xl:min-w-[446px] 2xl:min-w-[526px]">
              <Image
                src={iphoneImgData}
                alt=""
                className="absolute left-1/2 translate-x-[-50%] translate-y-0 transform md:w-[258px] lg:w-[348px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
