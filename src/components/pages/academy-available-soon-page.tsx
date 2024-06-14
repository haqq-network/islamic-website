import Image from 'next/image';
import { useTranslations } from 'next-intl';
import availableSoonBgImgData from '@/assets/images/available-soon-bg.webp';
import { Container } from '@/components/ui/container';
import { LocaleLink } from '@/navigation';
import { Text } from '@/components/ui/text';

export function AvailableSoonPage() {
  const t = useTranslations('available-soon-page');
  return (
    <section className="relative">
      <Container>
        <div className="flex flex-col items-center justify-center pb-[293px] pt-[273px] md:py-[305px] lg:py-[356px]">
          <div className="font-vcr text-[17px] uppercase leading-[26px] md:text-[18px] lg:text-[20px] lg:leading-[28px] rtl:font-handjet">
            {t('title')}
          </div>
          <LocaleLink
            href="/"
            className="mt-[8px] text-islamic-primary-green transition-colors duration-300 hover:text-islamic-primary-green-hover lg:mt-[16px]"
          >
            <Text size="small">{t('subtitle')}</Text>
          </LocaleLink>
        </div>
      </Container>
      <Image
        src={availableSoonBgImgData}
        alt=""
        className="user-select-none absolute left-1/2 top-[16%] z-[-1] h-[400px] w-[400px] -translate-x-1/2 object-cover md:top-[6.5%] md:h-[580px] md:w-[580px] lg:top-[4%] lg:h-[720px] lg:w-[720px]"
        priority
      />
    </section>
  );
}
