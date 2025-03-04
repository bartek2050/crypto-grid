import { useEffect, useState } from "react";

type CurrencyData = Record<string, number>;

interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: CurrencyData;
  total_volume: CurrencyData;
  market_cap_percentage: CurrencyData;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export const GlobalData = () => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch("https://api.coingecko.com/api/v3/globala");
        if (!response.ok) {
          throw new Error("Could not find global data");
        }
        console.log(error, "error");
        const json = await response.json();
        setGlobalData(json.data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchGlobalData();
  }, []);
  return (
    <>
      {loading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      {globalData && <p>Kapitalizacja rynkowa: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
    </>
  );
};