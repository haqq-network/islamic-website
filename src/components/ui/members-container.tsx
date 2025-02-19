'use client';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'usehooks-ts';
import { MemberCard } from './member-card';
import { MemberModalCard } from './member-modal-card';
import { Modal } from './modal';

type Member = {
  image: string;
  title: string;
  description: string;
  url?: string;
  subtitle?: string;
};

interface MembersContainerProps {
  type?: 'advisory' | 'shariah' | 'executive';
  members: Member[];
  className?: string;
}

export function MembersContainer({
  members,
  type,
  className,
}: MembersContainerProps) {
  const [isBoardModalOpen, setBoardModalIsOpen] = useState(false);
  const [memberModalData, setMemberModalData] = useState<Member>({
    description: '',
    image: '',
    title: '',
    url: '',
  });

  const openBoardModal = useCallback((memberData: Member) => {
    setBoardModalIsOpen(true);
    setMemberModalData(memberData);
  }, []);

  const closeBoardModal = useCallback(() => {
    setBoardModalIsOpen(false);
  }, []);

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div
      className={clsx('flex flex-col text-white', className)}
      id={`${
        type === 'advisory'
          ? 'advisory'
          : type === 'shariah'
            ? 'shariah'
            : 'executive'
      }-board`}
    >
      {type !== undefined && (
        <div className="text-[22px] font-[600] leading-[24px] md:text-[32px] md:leading-[36px] lg:text-[48px] lg:leading-[54px]">
          {type === 'advisory' && 'Advisory Board'}
          {type === 'executive' && 'Executive Board'}
          {type === 'shariah' && 'Shariah Board'}
        </div>
      )}

      {isMobile ? (
        <Swiper
          modules={[Navigation]}
          initialSlide={0}
          slidesPerView={1.5}
          spaceBetween={24}
          className={clsx(
            'max-w-full',
            type !== undefined && 'mt-[24px] md:mt-[28px] lg:mt-[32px]',
          )}
        >
          {members.map((member, idx) => {
            return (
              <SwiperSlide key={idx}>
                <MemberCard
                  image={member.image}
                  title={member.title}
                  url={member.url}
                  onClick={() => {
                    openBoardModal(member);
                  }}
                  role={member.subtitle}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div
          className={clsx(
            'grid grid-cols-2 gap-[32px] lg:grid-cols-4',
            type !== undefined && 'mt-[24px] md:mt-[28px] lg:mt-[32px]',
          )}
        >
          {members.map((member, idx) => {
            return (
              <MemberCard
                image={member.image}
                title={member.title}
                url={member.url}
                onClick={() => {
                  openBoardModal(member);
                }}
                key={idx}
                role={member.subtitle}
              />
            );
          })}
        </div>
      )}

      <Modal isOpen={isBoardModalOpen} onClose={closeBoardModal}>
        <MemberModalCard
          description={memberModalData.description}
          image={memberModalData.image}
          title={memberModalData.title}
          url={memberModalData.url}
          role={memberModalData.subtitle}
          onClick={closeBoardModal}
        />
      </Modal>
    </div>
  );
}
