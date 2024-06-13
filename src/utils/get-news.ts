import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { FalconerNewsPost, NewsPost, NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export function mapFalconerNews(data: FalconerNewsPost[]): NewsPost[] {
  return data.map((post) => {
    return {
      image: post.image,
      title: post.title,
      description: post.description,
      date: new Date(post.date),
      source: post.source,
      type: post.content_type,
      url: post.url,
    };
  });
}

export async function getIslamicNewsData(
  options: Partial<NextRequestInit>,
  limit?: number,
) {
  const requestUrl = new URL('/islamic/news', FALCONER_ENDPOINT);

  if (limit) {
    requestUrl.searchParams.append('limit', limit.toString());
  }

  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('News fetch failed');
  }

  const responseJson: FalconerNewsPost[] = await response.json();

  return mapFalconerNews(responseJson);
}

export const getNewsPageContentFromFalconer = cache(async (limit?: number) => {
  try {
    const data = await getIslamicNewsData(
      {
        next: {
          revalidate,
        },
      },
      limit,
    );

    return data;
  } catch (error) {
    console.error(error);
  }

  return undefined;
});
