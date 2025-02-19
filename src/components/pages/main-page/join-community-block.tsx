import Image from 'next/image';
import { useTranslations } from 'next-intl';
import cubesImgData from '@/assets/images/cubes.jpg';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';
import { LocaleLink } from '@/navigation';

export function JoinCommunityBlock() {
  const t = useTranslations('index-page');

  return (
    <section>
      <Container>
        <div className="my-[128px] flex w-full flex-col items-center text-center text-white md:my-[164px] lg:my-[200px]">
          <div className="pointer-events-none h-[120px] w-[304px] select-none md:h-[140px] md:w-[354px]">
            <Image src={cubesImgData} alt="" loading="lazy" />
          </div>
          <span className="mt-[16px] text-[28px] font-[600] leading-[32px] md:text-[44px] md:leading-[48px]">
            {t('join-community-block.title')}
          </span>
          <Text isMono className="mt-[8px]">
            {t('join-community-block.subtitle')}
          </Text>
          <LocaleLink href="/community-hub">
            <Button className="mt-[42px]">
              {t('join-community-block.button-text')}
            </Button>
          </LocaleLink>
        </div>
      </Container>
    </section>
  );
}
