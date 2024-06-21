import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from '@/constants';

export const {
  Link: LocaleLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({
  locales: SUPPORTED_LOCALES,
});
