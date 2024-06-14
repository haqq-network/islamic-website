import { LocaleLink } from '@/navigation';
import { ReactNode } from 'react';

export function DropdownLink({
  icon,
  title,
  href,
  isOutLink = false,
}: {
  icon?: ReactNode;
  title: string;
  href: string;
  isOutLink?: boolean;
}) {
  return (
    <LocaleLink
      href={href}
      target={isOutLink ? '_blank' : undefined}
      rel={isOutLink ? 'noopener noreferrer' : undefined}
      className="w-fit cursor-pointer px-[16px] py-[12px] text-base font-[500] text-white transition-colors duration-200 hover:text-islamic-primary-green"
    >
      <div className="flex items-center gap-x-[10px]">
        <div>{icon}</div>
        <div>{title}</div>
      </div>
    </LocaleLink>
  );
}
