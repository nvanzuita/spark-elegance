import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code-splitting: separa as bibliotecas grandes em ficheiros próprios.
    // Ganhos: (1) o browser descarrega várias peças em paralelo; (2) estas
    // bibliotecas mudam raramente, por isso ficam em cache entre visitas.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          cloudinary: ["@cloudinary/react", "@cloudinary/url-gen"],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
}));
