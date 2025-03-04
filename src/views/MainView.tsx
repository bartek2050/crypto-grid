import { GlobalData } from "../components/GlobalData.tsx";
import { TopCoins } from "../components/TopCoins.tsx";

export const MainView = () => {
  return (
    <>
      <h1>Crypto Grid</h1>
      <GlobalData />
      <TopCoins />
    </>
  );
};