import { useCrypto } from "../context/CryptoDataContext.tsx";
import "./GlobalData.css";

export const GlobalData = () => {
  const { globalData, isLoading, error } = useCrypto();

  const lastDataUpdate = globalData?.updated_at;
  const date = new Date(lastDataUpdate! * 1000);
  const time = date.toLocaleTimeString();

  return (
    <>
      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      <div className="global-data-wrapper">
        {globalData && <p>Total market cap: {globalData.total_market_cap.usd.toLocaleString()} USD</p>}
        {date && <p>Last update: {date.toLocaleDateString()}, {time}</p>}
      </div>
    </>
  );
};