import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Importe o Provider que criamos (ajuste o caminho se necessário)
createRoot(document.getElementById("root")!).render(
  <App />
);