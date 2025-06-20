import { useCrypto } from "../context/CryptoDataContext.tsx";
import { getPriceChangeColor } from "./../helper/getPriceChangeColor.ts";

type TopCoinsProps = {
  topTwentyMarketCap: number
}

export const TopCoins: React.FC<TopCoinsProps> = ({ topTwentyMarketCap }) => {
  const { globalData, topCoinsData, isLoading, error } = useCrypto();


  const topCoinsList = topCoinsData?.map(coin => (
    <tr key={coin.id}>
      <td className="coin-name"><img src={coin.image} alt={coin.name} />{coin.name}</td>
      <td>{coin.market_cap.toLocaleString()} USD</td>
      <td>{globalData?.total_market_cap.usd && ((coin.market_cap / Number(globalData.total_market_cap.usd || 1)) * 100).toFixed(2)}%
      </td>
      <td>{topTwentyMarketCap && ((coin.market_cap / topTwentyMarketCap) * 100).toFixed(2)}%
      </td>
      <td className="price-change">
        <div className="price-change-value">{coin.price_change_percentage_24h.toFixed(2) || 0}%</div>
        <div className="price-change-circle"
             style={{ backgroundColor: getPriceChangeColor(+coin.price_change_percentage_24h.toFixed(2) || 0) }}></div>
      </td>
      <td><a href={`https://www.coingecko.com/en/coins/${coin.id}`}>more →</a></td>
    </tr>
  ));
  return (
    <div className="top-coins-wrapper">
      {isLoading && <p>Loading top coins...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Market Cap</th>
          <th>Market Cap %</th>
          <th>Top 20 Market Cap %</th>
          <th>Price change 24h</th>
          <th></th>
        </tr>
        </thead>
        {!error && !isLoading && topCoinsList}
      </table>
    </div>
  );
};