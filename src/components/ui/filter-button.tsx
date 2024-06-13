import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function FilterButton({
  children,
  active,
  onClick,
}: PropsWithChildren<{
  active: boolean;
  onClick: () => void;
}>) {
  return (
    <div
      className={clsx(
        'cursor-pointer rounded-[8px] px-[12px] py-[8px] font-vcr text-[14px] font-[400] uppercase leading-[20px] text-white transition-colors duration-300 rtl:font-handjet',
        active
          ? 'bg-islamic-primary-green'
          : 'bg-transparent hover:bg-islamic-primary-green/50',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
