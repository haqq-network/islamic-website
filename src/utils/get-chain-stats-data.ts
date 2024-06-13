import { cache } from 'react';
import { FALCONER_ENDPOINT, REVALIDATE_TIME } from '@/constants';
import { NextRequestInit } from '@/types';

export const revalidate = REVALIDATE_TIME;

export interface HaqqChainStats {
  accounts: string;
  transactionsIn24Hour: string;
  consensusFinality: string;
  transactionAvgCost: string;
  coinomicsEra: string;
  coinomicsEmissionRate: string;
  supply: string;
  coinomicsWillBeMinted: string;
  circulatingSupply: string;
}

export interface ChainStats {
  mainnetAccountsCreated: number;
  transactionsInLast24Hours: number;
  secondsToConsensusFinality: number;
  averageCostPerTransaction: number;
  supply: number;
  circulatingSupply: number;
}

export async function getHaqqChainStatsData(options: Partial<NextRequestInit>) {
  const requestUrl = new URL('/haqq/chain_stats', FALCONER_ENDPOINT);

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

  const responseJson: HaqqChainStats = await response.json();

  return responseJson;
}

export const getChainStatsFromFalconer = cache(async () => {
  try {
    const stats = await getHaqqChainStatsData({
      next: {
        revalidate,
      },
    });

    return {
      mainnetAccountsCreated: Number.parseFloat(stats.accounts),
      transactionsInLast24Hours: Number.parseFloat(stats.transactionsIn24Hour),
      secondsToConsensusFinality: Number.parseFloat(stats.consensusFinality),
      averageCostPerTransaction: Number.parseFloat(stats.transactionAvgCost),
      supply: Number.parseFloat(stats.supply),
      circulatingSupply: Number.parseFloat(stats.circulatingSupply),
    };
  } catch (error) {
    console.error(error);
  }

  return {
    mainnetAccountsCreated: 0,
    transactionsInLast24Hours: 0,
    secondsToConsensusFinality: 0,
    averageCostPerTransaction: 0,
    supply: 0,
    circulatingSupply: 0,
  };
});
