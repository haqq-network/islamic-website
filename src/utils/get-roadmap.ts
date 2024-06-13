import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export interface RoadmapPeriod {
  title: string;
  goals: string[];
  isAchieved?: boolean;
}

export async function getIslamicRoadmapData(
  options: Partial<NextRequestInit>,
  locale: string,
) {
  const requestUrl = new URL('/islamic/roadmap', FALCONER_ENDPOINT);

  requestUrl.searchParams.append('locale', locale);

  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Roadmap fetch failed');
  }

  const responseJson = await response.json();

  return responseJson.items as RoadmapPeriod[];
}

export const getRoadmapContentFromFalconer = cache(async (locale: string) => {
  try {
    const data = await getIslamicRoadmapData(
      {
        next: {
          revalidate,
        },
      },
      locale,
    );

    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
});
