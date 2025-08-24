import { createContext, useState, ReactNode, useEffect, useCallback } from "react";

export interface Cadastro {
  id?: number;
  emitente: string;
  razao: string;
  foto: string;
  data: string;
}

interface CadastroContextType {
  cadastros: Cadastro[];
  addCadastro: (cadastro: Cadastro) => Promise<void>;
  removeCadastro: (id: number) => Promise<void>;
  fetchCadastros: () => Promise<void>;
}

export const CadastroContext = createContext<CadastroContextType>({
  cadastros: [],
  addCadastro: async () => {},
  removeCadastro: async () => {},
  fetchCadastros: async () => {},
});

export function CadastroProvider({ children }: { children: ReactNode }) {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Função memorizada para evitar re-renderizações desnecessárias
  const fetchCadastros = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/cadastros`);
      const data = await res.json();
      console.log("Cadastros recebidos:", data);
      setCadastros(data);
    } catch (err) {
      console.error("Erro ao buscar cadastros:", err);
    }
  }, [API_URL]);

  const addCadastro = async (cadastro: Cadastro) => {
    try {
      await fetch(`${API_URL}/cadastros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastro),
      });
      await fetchCadastros();
    } catch (err) {
      console.error("Erro ao adicionar cadastro:", err);
    }
  };

  const removeCadastro = async (id: number) => {
    try {
      await fetch(`${API_URL}/cadastros/${id}`, { method: "DELETE" });
      await fetchCadastros();
    } catch (err) {
      console.error("Erro ao remover cadastro:", err);
    }
  };

  // Executa apenas quando fetchCadastros mudar (graças ao useCallback)
  useEffect(() => {
    void fetchCadastros();
  }, [fetchCadastros]);

  return (
    <CadastroContext.Provider
      value={{ cadastros, addCadastro, removeCadastro, fetchCadastros }}
    >
      {children}
    </CadastroContext.Provider>
  );
}
