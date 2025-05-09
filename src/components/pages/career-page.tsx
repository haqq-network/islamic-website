import clsx from 'clsx';
import Image from 'next/image';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import careerStarsImgData from '@/assets/images/career-stars.jpg';
// import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';

export function CareerPage() {
  const t = useTranslations('career-page');

  return (
    <section className="overflow-x-clip pb-[60px] pt-[32px] text-white md:pb-[140px] md:pt-[52px] lg:pt-[68px]">
      <Container className="relative">
        <h1 className="text-[46px] font-[600] leading-[52px] md:text-[60px] md:leading-none lg:text-[80px]">
          {t('title')}
        </h1>

        <div className="mt-[32px] md:mt-[60px] md:max-w-[480px] lg:max-w-[600px]">
          <div className="flex flex-col gap-[16px] md:gap-[24px]">
            <p>
              <Text size="small">{t('text.paragraphs.first')}</Text>
            </p>
            <p>
              <Text size="small">{t('text.paragraphs.second')}</Text>
            </p>
            <p>
              <Text size="small">{t('text.paragraphs.third')}</Text>
            </p>
          </div>
        </div>

        <div
          className={clsx(
            'absolute z-[-1]',
            'right-[-222px] top-[-50px] h-[447px] w-[444px] rtl:left-[-222px] rtl:rotate-180 rtl:transform',
            'md:right-[-200px] md:top-[-80px] md:h-[720px] md:w-[724px] rtl:md:left-[-200px]',
            'lg:right-[-340px] lg:top-[-220px] lg:h-[1000px] lg:w-[1000px] rtl:lg:left-[-340px] rtl:lg:rotate-90',
            'opacity-70 md:opacity-100',
          )}
        >
          <Image src={careerStarsImgData} alt="" fill priority />
        </div>
      </Container>
    </section>
  );
}
