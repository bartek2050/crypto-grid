import { createContext, useContext, useEffect, useState } from "react";
import { GlobalDataType, TopCoinsDataList } from "../types/types.ts";
import * as React from "react";

interface CryptoDataContextType {
  globalData: GlobalDataType | null;
  topCoinsData: TopCoinsDataList;
  topTwentyMarketCap: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const CryptoContext = createContext<CryptoDataContextType | undefined>(undefined);

export const CryptoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalData, setGlobalData] = useState<GlobalDataType | null>(null);
  const [topCoinsData, setTopCoinsData] = useState<TopCoinsDataList>([]);
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
      setTopCoinsData(json);
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

  const topTwentyMarketCap = topCoinsData?.reduce((total, coin) => total + coin.market_cap, 0);

  const contextValue = {
    globalData,
    topCoinsData,
    topTwentyMarketCap,
    isLoading,
    error,
    refetch
  };

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoData must be used within a CryptoDataProvider");
  }
  return context;
};