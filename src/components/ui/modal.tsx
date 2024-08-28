'use client';
import { PropsWithChildren, SyntheticEvent, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

function ModalOverlay({ onClose }: { onClose: () => void }) {
  const handleKeydown = useCallback(
    (event: SyntheticEvent<HTMLDivElement, KeyboardEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.nativeEvent.code === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      role="none"
      className="bg-islamic-modal-overlay animate-reveal fixed inset-0 transform-gpu backdrop-blur"
      onClick={onClose}
      onKeyDown={handleKeydown}
    />
  );
}

export function ModalCloseButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        'h-[24px] w-[24px] cursor-pointer transition-colors duration-100 ease-in-out hover:text-islamic-primary-green',
        className,
      )}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <path
          d="M6 6L18.7742 18.7742"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 18.7734L18.7742 5.99924"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function Modal({
  children,
  onClose,
  isOpen = false,
}: PropsWithChildren<{
  isOpen?: boolean;
  onClose: () => void;
}>) {
  return (
    <Dialog
      as="div"
      className="relative z-[9999]"
      onClose={onClose}
      open={isOpen}
    >
      <ModalOverlay onClose={onClose} />

      <div className="pointer-events-none fixed inset-0 overflow-y-auto">
        <div className="pointer-events-none flex min-h-full items-center justify-center p-4">
          <div className="pointer-events-auto transform transition-all">
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
