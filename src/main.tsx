import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Importe o Provider que criamos (ajuste o caminho se necessário)
import { AuthProvider } from "./academy/contexts/AuthContext.tsx"; 

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);