'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import youtubeVideoPlaceholderImage from '@/assets/images/desert-preview.webp';
import { PlayVideoIcon } from '@/components/icons';
import { GradientText } from '@/components/ui/gradient-text';
import { Modal, ModalCloseButton } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import { LocaleLink } from '@/navigation';

const MODAL_YOUTUBE_VIDEO_ID = 'bevF9a3L3Sk';

export function HeroBlock() {
  const t = useTranslations('index-page');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);
  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);

  return (
    <section className="flex flex-col pt-[60px] text-white md:pt-[120px] xl:pt-[150px]">
      <h1 className="text-[46px] font-[600] leading-[52px] md:text-[60px] md:leading-none lg:text-[80px]">
        {t('hero-block.title.white-text')}
        <GradientText className="rtl:pb-[10px]">
          {t('hero-block.title.gradient-text')}
        </GradientText>
      </h1>
      <div className="mt-[24px] md:max-w-xl">
        <Text size="small" className="text-white/50 md:mt-[40px]">
          {t('hero-block.sub-text')}
        </Text>
      </div>

      <div className="mt-[18px] w-fit rounded-lg border border-[#2f2f2f] px-[18px] py-[8px] text-center font-vcr text-[15px] uppercase leading-[22px] md:text-base lg:text-[18px] lg:leading-[26px] rtl:font-handjet">
        <span>{t('hero-block.disclaimer.before-flag')}</span>
        &nbsp;
        <span role="img" aria-label="UAE">
          🇦🇪
        </span>
        &nbsp;
        <span>{t('hero-block.disclaimer.after-flag')}</span>
        &nbsp;
        <LocaleLink
          href="/dubai-residents-disclaimer"
          className="w-fit text-islamic-primary-green transition-colors duration-300 hover:text-islamic-primary-green-hover"
        >
          {t('hero-block.disclaimer.read-more')}
        </LocaleLink>
      </div>

      <div className="group mt-[40px] w-fit" onClick={openVideoModal}>
        <div className="relative h-[100px] w-[180px] brightness-50 transition-all duration-300 group-hover:cursor-pointer group-hover:brightness-100">
          <Image
            src={youtubeVideoPlaceholderImage}
            alt=""
            className="rounded-lg"
            fill
          />
          <PlayVideoIcon className="absolute left-[35%] top-[25%] transform transition-all duration-300 group-hover:scale-110" />
        </div>
      </div>

      <Modal isOpen={isVideoModalOpen} onClose={closeVideoModal}>
        <div className="relative mx-auto w-[288px] min-[375px]:w-[340px] min-[500px]:w-[460px] sm:w-[600px] md:w-[676px] lg:w-[928px]">
          <iframe
            title="Islamic Coin Video"
            src={`https://www.youtube.com/embed/${MODAL_YOUTUBE_VIDEO_ID}?rel=0&autoplay=1&showinfo=0`}
            allow="autoplay"
            allowFullScreen
            width="100%"
            className="mx-auto aspect-video rounded-[20px]"
          />

          <ModalCloseButton
            onClick={closeVideoModal}
            className="absolute right-[-24px] top-[-24px] outline-none lg:right-[-32px]"
          />
        </div>
      </Modal>
    </section>
  );
}
