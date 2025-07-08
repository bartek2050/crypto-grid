import { useCrypto } from "../context/CryptoDataContext.tsx";

type GlobalDataType = {
  topTwentyMarketCap: number
}

export const GlobalData: React.FC<GlobalDataType> = ({ topTwentyMarketCap }) => {
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
        <div className="global-data-cap">
          <div>
            <span>Total market cap:</span>
            <span>
                {(globalData?.total_market_cap.usd)?.toLocaleString(undefined, {
                  style: "currency",
                  maximumFractionDigits: 0,
                  currency: "USD"
                })}
            </span>
            <span>
              (100%)
            </span>
          </div>
          <div>
            <span>Top 20 market cap:</span>
            <span>
              {topTwentyMarketCap?.toLocaleString(undefined, {
                style: "currency",
                maximumFractionDigits: 0,
                currency: "USD"
              })}
            </span>
            <span>
              ({(topTwentyMarketCap / (globalData?.total_market_cap.usd || 1)).toLocaleString(undefined, { style: "percent" })})
            </span>
          </div>
        </div>
        {globalData && <p>Last update: {formatLastDateUpdate(globalData.updated_at)}</p>}
      </div>
    </>
  );
};