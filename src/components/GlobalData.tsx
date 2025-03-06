import { SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import { GlobalDataType } from "../views/MainView.tsx";

export const GlobalData = ({ globalData, setGlobalData }: {
  globalData: GlobalDataType | null,
  setGlobalData: React.Dispatch<SetStateAction<GlobalDataType | null>>
}) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        if (!response.ok) {
          setError(new Error(`Could not fetch data: ${response.status} ${response.statusText}`));
          return;
        }
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