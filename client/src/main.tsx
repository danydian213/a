import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AnniversaryProvider } from "./context/AnniversaryContext";

createRoot(document.getElementById("root")!).render(
  <AnniversaryProvider>
    <App />
  </AnniversaryProvider>
);
