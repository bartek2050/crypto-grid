import { GlobalData } from "../components/GlobalData.tsx";
import { TopCoins } from "../components/TopCoins.tsx";
import { Treemap } from "../components/Treemap.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export const MainView = () => {

  return (
    <>
      <Header />
      <GlobalData />
      <Treemap />
      <TopCoins />
      <Footer />
    </>
  );
};