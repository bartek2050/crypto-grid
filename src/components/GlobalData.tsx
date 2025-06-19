import { useCrypto } from "../context/CryptoDataContext.tsx";
import "./GlobalData.css";

export const GlobalData = () => {
  const { globalData, isLoading, error } = useCrypto();
  const date = new Date();
  const time = date.toLocaleTimeString();
  return (
    <>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      <div className="global-data-wrapper">
        {globalData && <p>Kapitalizacja rynkowa: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
        {date && <p>Data: {date.toLocaleDateString()}, {time}</p>}
      </div>
    </>
  );
};