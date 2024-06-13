import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export async function getIslamicPrivacyPolicyData(
  options: Partial<NextRequestInit>,
  locale: string,
) {
  const requestUrl = new URL('/islamic/pp', FALCONER_ENDPOINT);

  requestUrl.searchParams.append('locale', locale);

  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Privacy policy fetch failed');
  }

  const responseJson = await response.json();

  return responseJson.pp as string;
}

export const getPrivacyPolicyContentFromFalconer = cache(
  async (locale: string) => {
    try {
      const data = await getIslamicPrivacyPolicyData(
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

    return undefined;
  },
);
