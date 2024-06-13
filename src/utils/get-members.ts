import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export interface Member {
  image: string;
  title: string;
  description: string;
  url?: string;
  role?: string;
}

export interface FalconerMembers {
  advisory_members: Member[];
  executive_members: Member[];
  shariah_members: Member[];
  team_members: Member[];
  founder_members: Member[];
}

export async function getIslamicMembersData(
  options: Partial<NextRequestInit>,
  locale: string,
) {
  const requestUrl = new URL('/islamic/members', FALCONER_ENDPOINT);

  requestUrl.searchParams.append('locale', locale);

  const response = await fetch(requestUrl, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Members fetch failed');
  }

  const responseJson: { members: FalconerMembers } = await response.json();

  return {
    advisoryMembers: responseJson.members.advisory_members,
    executiveMembers: responseJson.members.executive_members,
    shariahMembers: responseJson.members.shariah_members,
    teamMembers: responseJson.members.team_members,
    founderMembers: responseJson.members.founder_members,
  };
}

export const getMembersContentFromFalconer = cache(async (locale: string) => {
  try {
    const data = await getIslamicMembersData(
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

  return {
    advisoryMembers: [],
    executiveMembers: [],
    shariahMembers: [],
    teamMembers: [],
    founderMembers: [],
  };
});
