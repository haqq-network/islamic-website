import clsx from 'clsx';
import { DEXPair } from './dex-pair';
import { GradientText } from './gradient-text';

interface DEXCardProps {
  pair: [string, string];
}

export function DEXCard({ pair }: DEXCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-row items-center gap-x-[12px] rounded-[20px] backdrop-blur-[6px] md:gap-x-[16px]',
        'bg-[#181E25B2] transition-colors duration-200 ease-in-out hover:bg-[#181E25] focus:bg-[#181E25] active:bg-[#181E25]',
        'p-[20px]',
      )}
    >
      <div className="flex-initial">
        <DEXPair pair={pair} />
      </div>
      <div>
        <div className="font-vcr text-[17px] font-[400] uppercase leading-[28px] md:text-[20px] md:leading-[34px] rtl:font-handjet">
          {`${pair[0]}/${pair[1]}`}
        </div>

        <div className="mt-[2px] font-alexandria text-[13px] font-[400] leading-[20px] md:mt-[4px] md:text-[16px] md:leading-[24px]">
          <GradientText>Go to Swap</GradientText>
        </div>
      </div>
    </div>
  );
}
