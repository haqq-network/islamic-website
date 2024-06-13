import { useEffect, useMemo, useState } from 'react';
import MODULES from '@/assets/academy-modules.json';
import { useLocale } from 'next-intl';
import { AcademyModulesJson } from '@/types';

export function useActiveLesson(
  initialModule?: number,
  initialLesson?: number,
) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(
    initialLesson ? initialLesson - 1 : 0,
  );
  const [activeModuleIndex, setActiveModuleIndex] = useState(
    initialModule ? initialModule - 1 : 0,
  );
  const locale = useLocale();

  const modules = ((MODULES as AcademyModulesJson)[locale] || MODULES['en'])
    .academyModules;

  const currentModuleLessons = useMemo(() => {
    if (activeModuleIndex === undefined) {
      return [];
    }

    const targetModule = modules[activeModuleIndex];

    if (!targetModule) {
      return [];
    }

    return targetModule.lessons;
  }, [modules, activeModuleIndex]);

  useEffect(() => {
    if (!currentModuleLessons) {
      return;
    }

    if (activeLessonIndex === undefined || activeModuleIndex === undefined) {
      setActiveLessonIndex(0);
      setActiveModuleIndex(0);
      return;
    }

    const lessonInModule = currentModuleLessons[activeLessonIndex];

    if (!lessonInModule) {
      setActiveLessonIndex(0);
    }
  }, [
    currentModuleLessons,
    activeLessonIndex,
    setActiveLessonIndex,
    setActiveModuleIndex,
    activeModuleIndex,
  ]);

  const currentActiveLesson = useMemo(() => {
    if (activeLessonIndex === undefined) {
      return;
    }

    const lesson = currentModuleLessons[activeLessonIndex];

    return lesson || currentModuleLessons[0];
  }, [activeLessonIndex, currentModuleLessons]);

  return {
    activeModuleIndex,
    activeLessonIndex,
    currentActiveLesson,
    setActiveLesson: setActiveLessonIndex,
    currentModuleLessons,
    setActiveModule: setActiveModuleIndex,
    modules,
  };
}
