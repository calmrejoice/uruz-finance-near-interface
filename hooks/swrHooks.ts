import useSWR from "swr";
import axios from "axios";

import { config } from "@constants/config";
import { IMarket } from "@constants/IMarket";
import { IMarketDetails } from "@constants/IMarketDetails";
import { ILendStats } from "@constants/ILendStats";

export const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export const useMarkets = () => {
  const { data, error } = useSWR(`/api/markets`, fetcher);

  const markets: IMarket[] = data;
  const isLoadingMarkets = !data && !error;
  const isEmptyMarkets = data?.length === 0;

  return {
    markets,
    isLoadingMarkets,
    isEmptyMarkets,
  };
};

export const useMarketDetails = (tokenSymbol: string) => {
  const { data, error, mutate } = useSWR(
    tokenSymbol ? `/api/marketDetails?tokenSymbol=${tokenSymbol}` : null,
    fetcher
  );

  const marketDetails: IMarketDetails = data;
  const isLoadingMarketDetails = !data && !error;
  const isEmptyMarketDetails = data?.length === 0;

  return {
    marketDetails,
    isLoadingMarketDetails,
    isEmptyMarketDetails,
    mutate,
  };
};

export const useLendStats = () => {
  const { data, error } = useSWR(`/api/lendStats`, fetcher);

  const lendStats: ILendStats = data;
  const isLoadingLendStats = !data && !error;
  const isEmptyLendStats = data?.length === 0;

  return {
    lendStats,
    isLoadingLendStats,
    isEmptyLendStats,
  };
};
