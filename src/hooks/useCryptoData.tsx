import { useEffect, useState } from "react";
import { GlobalDataType, TopCoinsDataType } from "../types/types.ts";


export const useCryptoData = () => {
  const [globalData, setGlobalData] = useState<GlobalDataType | null>(null);
  const [topCoinsData, setTopCoinsData] = useState<TopCoinsDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGlobalData = async () => {
    try {
      setError(null);
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      if (!response.ok) {
        throw new Error(`Could not fetch global data: ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      setGlobalData(json.data);
    } catch (e) {
      setError(e as Error);
    }
  };

  const fetchTopCoinsData = async () => {
    try {
      setError(null);
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20");
      if (!response.ok) {
        throw new Error(`Could not fetch top coins data: ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      setTopCoinsData(json.data);
    } catch (e) {
      setError(e as Error);
    }
  };

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    await Promise.all([fetchGlobalData(), fetchTopCoinsData()]);
    setIsLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    globalData,
    topCoinsData,
    isLoading,
    error,
    refetch
  };
};