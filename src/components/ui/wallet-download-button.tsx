'use client';
import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useHoverPopover,
} from './popover';
import {
  AndroidLogoIcon,
  AppStoreLogoIcon,
  GooglePlayLogoIcon,
  QrCodeIcon,
} from '../icons';

export function WalletDownloadButton({
  className,
  type,
  title,
}: {
  className?: string;
  type: 'google' | 'apple' | 'apk';
  title?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex min-w-[188px] flex-initial select-none flex-row items-center gap-x-[8px] rounded-xl px-[24px] py-[12px] transition duration-300',
        'bg-white text-[#2F2F2F] hover:text-islamic-primary-green hover:shadow-xl',
        className,
      )}
    >
      <span className="group-hover:text-islamic-primary-green group-hover:transition-colors group-hover:duration-300">
        {type === 'apple' && <AppStoreLogoIcon className="h-[34px] w-[34px]" />}
        {type === 'google' && (
          <GooglePlayLogoIcon className="h-[34px] w-[34px]" />
        )}
        {type === 'apk' && <AndroidLogoIcon className="h-[34px] w-[34px]" />}
      </span>
      <span className="flex flex-col text-center">
        {title && (
          <span className="text-[10px] leading-[12px] text-[#8E8E8E] group-hover:text-islamic-primary-green/50 group-hover:transition-colors group-hover:duration-300">
            {title}
          </span>
        )}
        <span className="text-[16px] font-[600] leading-[22px] group-hover:text-islamic-primary-green group-hover:transition-colors group-hover:duration-300">
          {type === 'apple' && 'App Store'}
          {type === 'google' && 'Google Play'}
          {type === 'apk' && 'Download .apk'}
        </span>
      </span>
    </span>
  );
}

export function WalletDownloadWithQrButton({
  className,
  type,
  link,
  title,
}: {
  className?: string;
  type: 'google' | 'apple';
  link: string;
  title: string;
}) {
  const { isHovered, handleMouseEnter, handleMouseLeave } =
    useHoverPopover(100);

  return (
    <Popover open={isHovered} placement={'right'}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className={clsx(
            'inline-flex min-w-[188px] flex-initial select-none flex-row items-center gap-x-[8px] rounded-xl px-[24px] py-[12px] transition duration-300',
            'bg-white text-[#2F2F2F] hover:text-islamic-primary-green hover:shadow-xl',
            className,
          )}
        >
          {type === 'apple' && (
            <AppStoreLogoIcon className="h-[34px] w-[34px]" />
          )}
          {type === 'google' && (
            <GooglePlayLogoIcon className="h-[34px] w-[34px]" />
          )}

          <div>
            <div className={clsx('flex flex-col text-start', className)}>
              <span className="text-[10px] leading-[12px]">{title}</span>
              <span className="text-[16px] font-[600] leading-[22px]">
                {type === 'apple' && 'App Store'}
                {type === 'google' && 'Google Play'}
              </span>
            </div>
          </div>

          <div className="pl-[16px]">
            <QrCodeIcon />
          </div>
        </span>
      </PopoverTrigger>

      <PopoverContent className="z-[100] transform-gpu rounded-lg border border-[#FFFFFF26] bg-islamic-bg-black bg-opacity-90 p-4 text-white shadow-lg outline-none backdrop-blur">
        <div className="flex flex-col items-center gap-3">
          <div className="leading-none">
            <div className="inline-block rounded border bg-white p-[4px]">
              <QRCodeSVG
                value={link}
                size={148}
                bgColor="#ffffff"
                fgColor="#0d0d0e"
              />
            </div>
          </div>

          <div className="text-xs text-white/80">Scan QR to download</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
