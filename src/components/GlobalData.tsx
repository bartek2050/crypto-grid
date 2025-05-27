import { useCrypto } from "../context/CryptoDataContext.tsx";

export const GlobalData = () => {
  const { globalData, isLoading, error } = useCrypto();

  return (
    <>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      {globalData && <p>Kapitalizacja rynkowa: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
    </>
  );
};