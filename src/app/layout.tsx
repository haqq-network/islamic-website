import { PropsWithChildren } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/constants';
import { SupportedLocales } from '@/types';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => {
    return { locale };
  });
}

export default function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren & { params: { locale: SupportedLocales } }) {
  unstable_setRequestLocale(locale);

  return children;
}
