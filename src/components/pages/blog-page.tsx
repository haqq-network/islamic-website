import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { FeaturedPostBlock } from '@/components/ui/featured-post-block';
import { PostsBlock } from '@/components/ui/posts-block';
import { Text } from '@/components/ui/text';
import { Post } from '@/types';
import { SubscribeForm } from '@/components/forms/subscribe-form';

function BlockPageHeader({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const t = useTranslations();

  return (
    turnstileSiteKey && (
      <div className="flex flex-col gap-y-[32px] md:gap-y-[42px] lg:gap-y-[56px]">
        <h1 className="text-start text-[46px] font-[600] leading-[52px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[80px]">
          {t('blog-page.title')}
        </h1>
        <div className="flex flex-col gap-x-[28px] gap-y-[24px] lg:flex-row lg:items-start">
          <Text size="small">{t('subscribe-form.text')}</Text>
          <SubscribeForm
            className="flex w-full flex-col gap-[16px] md:flex-row"
            inputClassName="lg:min-w-[280px]"
            turnstileSiteKey={turnstileSiteKey}
          />
        </div>
      </div>
    )
  );
}

export function BlogPage({
  turnstileSiteKey,
  featuredPost,
  posts,
  tags,
}: {
  turnstileSiteKey?: string;
  posts: Post[];
  featuredPost: Post | undefined;
  tags: string[];
}) {
  return (
    <section className="flex flex-col items-center pb-[60px] pt-[32px] text-white md:pb-[100px] md:pt-[52px] lg:pb-[140px] lg:pt-[68px]">
      <Container>
        <BlockPageHeader turnstileSiteKey={turnstileSiteKey} />
        {featuredPost && <FeaturedPostBlock post={featuredPost} />}
        {posts.length > 0 && <PostsBlock posts={posts} tags={tags} />}
      </Container>
    </section>
  );
}
