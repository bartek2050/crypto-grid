import { useEffect, useState } from "react";
import { GlobalDataType } from "../views/MainView.tsx";

interface TopCoinsData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // ISO date format
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // ISO date format
  roi?: string; // Nieokreślone w przykładzie, więc pozostawione opcjonalnie
  last_updated: string; // ISO date format
  price_change_percentage_1h: number;
  sparkline_in_7d: {
    price: number[];
  };
}


export const TopCoins = ({ globalData }: { globalData: GlobalDataType | null }) => {
  const [topCoins, setTopCoins] = useState<TopCoinsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTopCoinsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20");
        if (!response.ok) {
          setError(new Error(`Could not fetch data: ${response.status} ${response.statusText}`));
          return;
        }
        const json = await response.json();
        setTopCoins(json);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCoinsData();
  }, []);

  const topCoinsList = topCoins.map(coin => (
    <div key={coin.id}>
      <b>Name: {coin.name}</b>
      <p>Market Cap: {coin.market_cap.toLocaleString()} USD</p>
      <p>Market Cap
        Percentage: {globalData?.total_market_cap.usd && ((coin.market_cap / Number(globalData.total_market_cap.usd || 1)) * 100).toFixed(2)}%</p>
    </div>
  ));
  return (
    <>
      {loading && <p>Ładowanie top coins...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      {!error && !loading && topCoinsList}
    </>
  );
};