import { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { DEPLOY_URL, VERCEL_ENV } from '@/constants';
import { PHProvider } from '@/providers/posthog';
import { alexandriaFont, handjetFont, vcrFont } from '@/lib/fonts';
import { MobileHeader } from '@/components/ui/header-mobile';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/consent-cookie.css';
import '@/styles/global.css';
import { Footer } from '@/components/ui/footer';
import { Container } from '@/components/ui/container';
import { CookieConsentModal } from '@/components/ui/cookie-consent-modal';
import { SupportedLocales } from '@/types';
import { LocaleLink } from '@/lib/navigation';
import { SOCIAL_LINKS } from '@/lib/social-links';
import { getMessages } from 'next-intl/server';
console.log({ DEPLOY_URL });

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

// async function getMessages(locale: string) {
//   const { default: defaultMessages } = await import(
//     `../../../messages/${locale}.json`
//   );

//   return defaultMessages;
// }

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
  const messages = await getMessages();

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
        defer={true}
        id="gtm"
        data-cookiecategory="analytics"
        dangerouslySetInnerHTML={{
          __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5H2ZFCN');
                  `,
        }}
      />
      <Script
        async={true}
        defer={true}
        id="gtm-2"
        data-cookiecategory="analytics"
        dangerouslySetInnerHTML={{
          __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-WMP75MQS');
                  `,
        }}
      />
      <Script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=G-5FLBNV5M30"
        id="gtm-haqq"
        data-cookiecategory="analytics"
      />
      <Script
        defer={true}
        id="gtm-haqq-2"
        data-cookiecategory="analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-5FLBNV5M30');
          `,
        }}
      />
      <Script
        async={true}
        src="https://www.googletagmanager.com/ns.html?id=GTM-WMP75MQS"
        id="gtm-haqq-3"
        data-cookiecategory="analytics"
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