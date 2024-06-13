'use client';
import dynamic from 'next/dynamic';
import { SupportedLocales } from '@/types';
import { useMediaQuery } from 'usehooks-ts';

const DesktopHeader = dynamic(
  async () => {
    const { DesktopHeader } = await import('./header-desktop');
    return { default: DesktopHeader };
  },
  // { ssr: false },
);
const MobileHeader = dynamic(
  async () => {
    const { MobileHeader } = await import('./header-mobile');
    return { default: MobileHeader };
  },
  // { ssr: false },
);

export function Header({
  isBannerVisible = false,
  locale,
  className,
  isBuyButtonVisible = true,
}: {
  isBannerVisible?: boolean;
  locale: SupportedLocales;
  className?: string;
  isBuyButtonVisible?: boolean;
}) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return isDesktop ? (
    <DesktopHeader
      className={className}
      locale={locale}
      isBannerVisible={isBannerVisible}
      isBuyButtonVisible={isBuyButtonVisible}
    />
  ) : (
    <MobileHeader
      className={className}
      locale={locale}
      isBannerVisible={isBannerVisible}
      isBuyButtonVisible={isBuyButtonVisible}
    />
  );
}
