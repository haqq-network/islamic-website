import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function Tab({
  onClick,
  children,
  className,
  isActive,
}: PropsWithChildren<{
  className?: string;
  isActive?: boolean;
  onClick: () => void;
}>) {
  return (
    <div
      className={clsx(
        'cursor-pointer rounded-[8px] px-[12px] py-[8px] font-vcr text-[14px] font-[400] uppercase leading-[20px] text-white transition-colors duration-300 rtl:font-handjet',
        isActive
          ? 'bg-islamic-primary-green'
          : 'bg-transparent hover:bg-islamic-primary-green/50',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function Tabs({
  tabs,
  current,
  className,
  onChange,
}: {
  tabs: string[];
  current: string;
  className?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      className={clsx(
        'flex w-fit flex-row items-center gap-x-[8px] rounded-[10px] bg-[#2F2F2F] p-[6px] rtl:flex-row-reverse',
        className,
      )}
    >
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={`${index}-${tab}`}
            isActive={current === tab}
            onClick={() => {
              onChange(tab);
            }}
          >
            {tab}
          </Tab>
        );
      })}
    </div>
  );
}
