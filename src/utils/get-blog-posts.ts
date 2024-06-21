import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export interface FalconerBlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content?: string;
  description?: string;
  image: { src: string; width: number; height: number } | null;
  isFeatured?: boolean;
  tags: string[];
  utmCampaign?: string;
}

export async function getIslamicBlogPostsData(
  options: Partial<NextRequestInit>,
) {
  const requestUrl = new URL('/islamic/blog', FALCONER_ENDPOINT);
  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Blog posts fetch failed');
  }

  const responseJson = await response.json();

  return responseJson.posts as FalconerBlogPost[];
}

export const getIslamicBlogPostsFromFalconer = cache(async () => {
  try {
    const posts = await getIslamicBlogPostsData({
      next: {
        revalidate,
      },
    });

    const tags = [];
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    for (const post of sortedPosts) {
      tags.push(...post.tags);
    }

    return { posts, tags: [...new Set(tags)] };
  } catch (error) {
    console.error(error);
  }

  return { posts: [], tags: [] };
});

export const getBlogPost = cache(async (slug: string) => {
  const posts = await getIslamicBlogPostsData({
    next: {
      revalidate,
    },
  });

  return posts.find((post) => {
    return post.slug === slug;
  });
});
