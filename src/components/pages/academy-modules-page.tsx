'use client';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { LessonsBlock } from '@/components/ui/lessons-block';
import { Text } from '@/components/ui/text';
import { LocaleLink } from '@/navigation';

export function AcademyModulesPage({
  moduleIndex,
  lessonIndex,
}: {
  moduleIndex: number;
  lessonIndex: number;
}) {
  const t = useTranslations('academy-modules-page');

  return (
    <div className="relative mb-[140px] mt-[30px] md:mb-[100px] lg:mt-[45px]">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <LocaleLink href="/academy">
            <Text size="small" isMono>
              {t('back')}
            </Text>
          </LocaleLink>

          <LessonsBlock
            initialLesson={lessonIndex}
            initialModule={moduleIndex}
          />
        </div>
      </Container>
    </div>
  );
}
