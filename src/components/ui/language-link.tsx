import { LocaleLink } from '@/lib/navigation';
import { SupportedLocales } from '@/types';
import clsx from 'clsx';
import { CheckMarkIcon } from '../icons/header-icons';

export const localeDisplayNames: Record<string, string> = {
  ar: 'العربية',
  // en: 'English',
  // id: 'Bahasa Indonesia',
};

export function LanguageLink({
  href,
  locale,
  isActive,
}: {
  href: string;
  locale: SupportedLocales;
  isActive: boolean;
}) {
  return (
    <LocaleLink
      href={href}
      locale={locale}
      className={clsx(
        'min-w-[170px] px-[16px] py-[12px] text-base font-[500] text-white transition-colors duration-200',
        isActive
          ? 'pointer-events-none select-none'
          : 'cursor-pointer hover:text-islamic-primary-green',
      )}
    >
      <span className="flex items-center justify-between">
        <span>{localeDisplayNames[locale]}</span>
        {isActive && <CheckMarkIcon />}
      </span>
    </LocaleLink>
  );
}
