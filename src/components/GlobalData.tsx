import { useCryptoData } from "../hooks/useCryptoData.tsx";
import { GlobalDataType } from "../types/types.ts";

export const GlobalData = () => {
  const { globalData, isLoading, error } = useCryptoData<GlobalDataType, boolean, Error>();

  return (
    <>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      {globalData && <p>Kapitalizacja rynkowa: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
    </>
  );
};