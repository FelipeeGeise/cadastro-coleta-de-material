// src/pages/_app.tsx
import "../styles/Home.module.css";
import type { AppProps } from "next/app";
import { CadastroProvider } from "@/contexts/CadastroContext";
import { CadastroDestinoProvider } from "@/contexts/CadastroDestinoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CadastroProvider>
      <CadastroDestinoProvider>
        <Component {...pageProps} />
      </CadastroDestinoProvider>
    </CadastroProvider>
  );
}
