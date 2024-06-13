import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { FalconerNewsPost, NewsPost, NextRequestInit } from '@/types';
import { FalconerMembers } from './get-members';

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

export async function getIslamicHomePageData(
  options: Partial<NextRequestInit>,
  locale: string,
) {
  const requestUrl = new URL('/islamic/home', FALCONER_ENDPOINT);

  requestUrl.searchParams.append('locale', locale);

  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Homepage data fetch failed');
  }

  const responseJson: {
    members: FalconerMembers;
    news: FalconerNewsPost[];
  } = await response.json();

  return {
    news: mapFalconerNews(responseJson.news),
    advisoryMembers: responseJson.members.advisory_members,
    executiveMembers: responseJson.members.executive_members,
    shariahMembers: responseJson.members.shariah_members,
  };
}

export const getHomePageDataFromFalconer = cache(async (locale: string) => {
  try {
    const data = await getIslamicHomePageData(
      {
        next: {
          revalidate,
        },
      },
      locale,
    );

    return {
      advisoryMembers: data.advisoryMembers,
      executiveMembers: data.executiveMembers,
      shariahMembers: data.shariahMembers,
      news: data.news,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    advisoryMembers: [],
    executiveMembers: [],
    shariahMembers: [],
    news: [],
  };
});
