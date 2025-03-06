import { GlobalData } from "../components/GlobalData.tsx";
import { TopCoins } from "../components/TopCoins.tsx";
import { useState } from "react";

type CurrencyDataType = Record<string, number>;

export interface GlobalDataType {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: CurrencyDataType;
  total_volume: CurrencyDataType;
  market_cap_percentage: CurrencyDataType;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export const MainView = () => {
  const [globalData, setGlobalData] = useState<GlobalDataType | null>(null);

  return (
    <>
      <h1>Crypto Grid</h1>
      <GlobalData setGlobalData={setGlobalData} globalData={globalData} />
      <TopCoins globalData={globalData} />
    </>
  );
};