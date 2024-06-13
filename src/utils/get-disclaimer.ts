import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export async function getIslamicDisclaimerData(
  options: Partial<NextRequestInit>,
  locale: string,
) {
  const requestUrl = new URL('/islamic/disclaimer', FALCONER_ENDPOINT);

  requestUrl.searchParams.append('locale', locale);

  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Disclaimer fetch failed');
  }

  const responseJson = await response.json();

  return responseJson.disclaimer as string;
}

export const getDisclaimerContentFromFalconer = cache(
  async (locale: string) => {
    try {
      const data = await getIslamicDisclaimerData(
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

    return '';
  },
);
