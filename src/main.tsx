import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/style/global.css";
import App from "./App.tsx";
import Provider from "./providers/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
