import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CryptoDataProvider } from "./context/CryptoDataContext.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CryptoDataProvider>
      <App />
    </CryptoDataProvider>
  </StrictMode>
);
