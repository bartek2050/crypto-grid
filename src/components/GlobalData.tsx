import { useCrypto } from "../context/CryptoDataContext.tsx";

export const GlobalData = () => {
  const { globalData, topTwentyMarketCap, isLoading, error } = useCrypto();

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
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">API Limits: {error.message}</p>}
      <div className="global-data-wrapper">
        <div className="global-data-cap">
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
          <div>
            <span />
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
        </div>
        {error && <p className="error">API Limits: {error.message}</p>}
        {globalData && <p>Last update: {formatLastDateUpdate(globalData.updated_at)}</p>}
      </div>
    </>
  );
};