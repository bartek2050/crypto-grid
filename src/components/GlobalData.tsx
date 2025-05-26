import { useCryptoData } from "../hooks/useCryptoData.tsx";

export const GlobalData = () => {
  const { globalData, isLoading, error } = useCryptoData();

  return (
    <>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      {globalData && <p>Kapitalizacja rynkowa: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
    </>
  );
};