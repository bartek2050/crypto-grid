import { GlobalData } from "../components/GlobalData.tsx";
import { TopCoins } from "../components/TopCoins.tsx";
import { Treemap } from "../components/Treemap.tsx";
import { Header } from "../components/Header.tsx";

export const MainView = () => {

  return (
    <>
      <Header />
      <GlobalData />
      <Treemap />
      <TopCoins />
    </>
  );
};