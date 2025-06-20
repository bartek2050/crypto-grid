import { useCrypto } from "../context/CryptoDataContext.tsx";
import "./GlobalData.css";

export const GlobalData = () => {
  const { globalData, isLoading, error } = useCrypto();

  const formatLastDateUpdate = (timestamp: number | undefined) => {
    if (!timestamp) {
      return "N/A";
    }
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      <div className="global-data-wrapper">
        {globalData && <p>Total market cap: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
        {globalData && <p>Last update: {formatLastDateUpdate(globalData.updated_at)}</p>}
      </div>
    </>
  );
};