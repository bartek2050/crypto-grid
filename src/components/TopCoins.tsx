import { useCrypto } from "../context/CryptoDataContext.tsx";

type TopCoinsProps = {
  topTwentyMarketCap: number
}

export const TopCoins: React.FC<TopCoinsProps> = ({ topTwentyMarketCap }) => {
  const { globalData, topCoinsData, isLoading, error } = useCrypto();


  const topCoinsList = topCoinsData?.map(coin => (
    <div key={coin.id}>
      <b>Name: {coin.name}</b>
      <p>Market Cap: {coin.market_cap.toLocaleString()} USD</p>
      <p>Market Cap
        Percentage: {globalData?.total_market_cap.usd && ((coin.market_cap / Number(globalData.total_market_cap.usd || 1)) * 100).toFixed(2)}%</p>
      <p>Top 20 Market Cap
        Percentage: {topTwentyMarketCap && ((coin.market_cap / topTwentyMarketCap) * 100).toFixed(2)}%</p>
      <p>Price change 24h: {coin.price_change_percentage_24h.toFixed(2)}%</p>
    </div>
  ));
  return (
    <>
      {isLoading && <p>Ładowanie top coins...</p>}
      {error && <p style={{ color: "red" }}>Błąd: {error.message}</p>}
      {!error && !isLoading && topCoinsList}
    </>
  );
};