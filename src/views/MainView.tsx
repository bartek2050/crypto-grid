import { GlobalData } from "../components/GlobalData.tsx";
import { TopCoins } from "../components/TopCoins.tsx";
import { Treemap } from "../components/Treemap.tsx";
import { Header } from "../components/Header.tsx";
import { useCrypto } from "../context/CryptoDataContext.tsx";

export const MainView = () => {
  const { topCoinsData } = useCrypto();
  const topTwentyMarketCap = topCoinsData?.reduce((total, coin) => total + coin.market_cap, 0);

  return (
    <>
      <Header />
      <GlobalData topTwentyMarketCap={topTwentyMarketCap} />
      <Treemap />
      <TopCoins topTwentyMarketCap={topTwentyMarketCap} />
    </>
  );
};