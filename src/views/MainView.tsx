import { GlobalData } from "../components/GlobalData.tsx";
import { TopCoins } from "../components/TopCoins.tsx";
import { Treemap } from "../components/Treemap.tsx";


export const MainView = () => {
  
  return (
    <>
      <h1>Crypto Grid</h1>
      <Treemap />
      <GlobalData />
      <TopCoins />
    </>
  );
};