export type SupportedLocales = 'en'; // | 'ar' | 'id';

export interface NextRequestInit extends RequestInit {
  next?: {
    revalidate?: number;
  };
}

export interface AcademyLessonJson {
  name: string;
  duration: string;
  title: string;
  description: string;
  video_link: string;
  quiz_link: string;
}

interface AcademyModuleJson {
  name: string;
  lessons: AcademyLessonJson[];
}

export interface AcademyModulesJson {
  [locale: string]: {
    academyModules: AcademyModuleJson[];
  };
}

export interface AcademyLesson {
  lessonId?: string;
  lessonTitle: string;
  lessonDescription: string;
}

export type AvailableAcademyModule = {
  isAvailable: true;
  availableLessonsDate: Date;
  isLessonsAvailable?: boolean;
  moduleLessons: AcademyLesson[];
};

export type UnavailableAcademyModule = {
  isAvailable: false;
};

export type AcademyModule = AvailableAcademyModule | UnavailableAcademyModule;

export type PostType = 'press' | 'events';

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  content?: string;
  description?: string;
  image: { src: string; width: number; height: number } | null;
  isFeatured?: boolean;
  type?: PostType;
  tags: string[];
}

export interface FalconerNewsPost {
  image: {
    src: string;
    width: number;
    height: number;
  } | null;
  title: string;
  description: string;
  date: string;
  source: string;
  content_type: string;
  url: string;
}

export interface NewsPost {
  image: {
    src: string;
    width: number;
    height: number;
  } | null;
  title: string;
  description: string;
  date: Date;
  source: string;
  type: string;
  isFeatured?: boolean;
  url: string;
}

export interface Member {
  image: string;
  title: string;
  description: string;
  url?: string;
  role?: string;
}
