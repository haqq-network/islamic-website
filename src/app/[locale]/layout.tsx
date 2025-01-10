import { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { CookieConsentModal } from '@/components/ui/cookie-consent-modal';
import { Footer } from '@/components/ui/footer';
import { MobileHeader } from '@/components/ui/header-mobile';
import { DEPLOY_URL, VERCEL_ENV } from '@/constants';
import { alexandriaFont, handjetFont, vcrFont } from '@/lib/fonts';
import { SOCIAL_LINKS } from '@/lib/social-links';
import { LocaleLink } from '@/navigation';
import { PHProvider } from '@/providers/posthog';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/consent-cookie.css';
import '@/styles/global.css';
import { SupportedLocales } from '@/types';

export const metadata: Metadata = {
  title: {
    template: '%s | IslamicCoin',
    default: 'IslamicCoin',
  },
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL(DEPLOY_URL),
  other: {
    google: 'notranslate',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 2,
  width: 'device-width',
};

const PostHogPageView = dynamic(
  async () => {
    const { PostHogPageView } = await import(
      '@/components/ui/posthog-page-view'
    );
    return { default: PostHogPageView };
  },
  { ssr: false },
);

const IdentifyWalletUsers = dynamic(
  async () => {
    const { IdentifyWalletUsers } = await import(
      '@/components/ui/identify-wallet-users'
    );
    return { default: IdentifyWalletUsers };
  },
  { ssr: false },
);

const Header = dynamic(async () => {
  const { Header } = await import('@/components/ui/header');
  return { default: Header };
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: SupportedLocales } }>) {
  const messages = await getMessages({ locale });

  if (!messages) {
    console.warn('No translation messages found for locale: ', locale);
    notFound();
  }

  const isScamBannerShow = true;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'GMT';
  const headersList = headers();
  const isRestrictedByGeo = Boolean(headersList.get('x-restricted-by-geo'));
  const userAgent = headersList.get('user-agent');
  const isMobileUserAgent = userAgent
    ? Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
        ),
      )
    : false;

  return (
    <html
      lang={locale}
      dir="ltr"
      // dir={locale === 'ar' ? 'rtl' : 'ltr'}
      translate="no"
      className={clsx(
        alexandriaFont.variable,
        handjetFont.variable,
        vcrFont.variable,
      )}
    >
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <PHProvider>
          <body className="flex min-h-screen flex-col bg-islamic-bg-black font-alexandria text-white antialiased">
            <PostHogPageView />
            <IdentifyWalletUsers />

            {isScamBannerShow && <ScamBanner />}
            {isMobileUserAgent ? (
              <MobileHeader
                locale={locale}
                isBannerVisible={isScamBannerShow}
                isBuyButtonVisible={!isRestrictedByGeo}
              />
            ) : (
              <Header
                locale={locale}
                isBannerVisible={isScamBannerShow}
                isBuyButtonVisible={!isRestrictedByGeo}
              />
            )}
            <main className="flex-1">{children}</main>
            <Footer socialLinks={SOCIAL_LINKS} />

            <AnalyticsAndScripts />
          </body>
        </PHProvider>
      </NextIntlClientProvider>
    </html>
  );
}

function AnalyticsAndScripts() {
  if (VERCEL_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        async={true}
        defer={true}
        id="fb-pixel"
        data-cookiecategory="analytics"
        dangerouslySetInnerHTML={{
          __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '873030480371387');
                    fbq('track', 'PageView');
                  `,
        }}
      />
      <Script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=G-SLXJ759ZRZ"
        id="gtag-script"
        data-cookiecategory="analytics"
      />
      <Script
        id="gtag-config"
        data-cookiecategory="analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SLXJ759ZRZ');
          `,
        }}
      />

      <CookieConsentModal />
      <SpeedInsights />
    </>
  );
}

function ScamBanner() {
  return (
    <div className="fixed top-[0px] z-[9000] w-full bg-[#EB9226] py-[8px] text-center font-vcr text-[16px] uppercase leading-[24px] text-white rtl:font-handjet">
      <Container>
        Beware of scammers! <br className="block md:hidden" />
        Check{' '}
        <LocaleLink href="/scam-alert" className="underline">
          this page
        </LocaleLink>{' '}
        for more information
      </Container>
    </div>
  );
}
