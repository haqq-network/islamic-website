import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

interface HaqqPriceResponse {
  price: number;
}

export async function getIslamicPriceData(options: Partial<NextRequestInit>) {
  const requestUrl = new URL('/islamic/price', FALCONER_ENDPOINT);
  const response = await fetch(requestUrl, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Chain stats fetch failed');
  }

  const responseJson: HaqqPriceResponse = await response.json();

  return responseJson.price;
}

export const getPriceFromFalconer = cache(async () => {
  try {
    return await getIslamicPriceData({
      next: {
        revalidate,
      },
    });
  } catch (error) {
    console.error(error);
    return 0;
  }
});
