import { useTranslations } from 'next-intl';
import { SubscribeForm } from '@/components/forms/subscribe-form';
import { Container } from '@/components/ui/container';
import { NewsBlock } from '@/components/ui/news-block';
import { Text } from '@/components/ui/text';
import { env } from '@/env/client';
import { NewsPost } from '@/types';

export function NewsPage({ news }: { news?: NewsPost[] }) {
  const t = useTranslations();

  return (
    <section className="flex flex-col pb-[60px] pt-[32px] text-white md:pb-[100px] md:pt-[52px] lg:pb-[140px] lg:pt-[68px]">
      <Container>
        <h1 className="text-[46px] font-[600] leading-[52px] md:text-[60px] md:leading-none lg:text-[80px]">
          {t('news-page.title')}
        </h1>

        <div className="mt-[32px] flex flex-col gap-[24px] lg:mt-[56px] lg:flex-row xl:w-3/4">
          <div className="md:max-w-[430px] lg:w-1/2">
            <Text size="small">{t('subscribe-form.text')}</Text>
          </div>
          <SubscribeForm
            className="flex flex-col gap-[16px] md:flex-row"
            inputClassName="md:w-[285px]"
            turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITEKEY}
          />
        </div>

        {news && news.length > 0 && (
          <NewsBlock
            posts={news}
            className="mt-[60px] md:mt-[110px] lg:mt-[140px]"
          />
        )}
      </Container>
    </section>
  );
}
