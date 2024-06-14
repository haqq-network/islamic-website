import { SUPPORTED_LOCALES } from '@/constants';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const {
  Link: LocaleLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({
  locales: SUPPORTED_LOCALES,
});
