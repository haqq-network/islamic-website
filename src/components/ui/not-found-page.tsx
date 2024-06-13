import Image from 'next/image';
import { useTranslations } from 'next-intl';
import notFoundBgImgData from '@/assets/images/not-found-bg.webp';
import { Container } from './container';
import { LocaleLink } from '@/lib/navigation';
import { Text } from './text';

export function NotFound() {
  const t = useTranslations('not-found-page');

  return (
    <section className="relative">
      <Container className="pb-[265px] pt-[245px] lg:py-[312px]">
        <div className="flex flex-col items-center justify-center">
          <div className="font-vcr text-[46px] font-[600] leading-[52px] md:text-[60px] md:leading-none lg:text-[80px] rtl:font-handjet">
            404
          </div>
          <div className="mt-[4px] font-vcr text-[17px] uppercase leading-[26px] md:text-[18px] lg:text-[20px] lg:leading-[28px] rtl:font-handjet">
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
        src={notFoundBgImgData}
        alt="Not Found"
        className="user-select-none absolute left-1/2 top-[16%] z-[-1] h-[400px] w-[400px] -translate-x-1/2 object-cover md:top-[1.5%] md:h-[580px] md:w-[580px] lg:top-[2%] lg:h-[720px] lg:w-[720px]"
      />
    </section>
  );
}
