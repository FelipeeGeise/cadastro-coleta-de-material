import { createContext, useState, ReactNode, useEffect } from "react";

export interface Cadastro {
  id?: number; // id vindo do banco
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

  const API_URL = "http://localhost:4000"; // endereço do backend

  // Buscar cadastros do backend
  const fetchCadastros = async () => {
    try {
      const res = await fetch(`${API_URL}/cadastros`);
      const data = await res.json();
      setCadastros(data);
    } catch (err) {
      console.error("Erro ao buscar cadastros:", err);
    }
  };

  // Adicionar cadastro via backend
  const addCadastro = async (cadastro: Cadastro) => {
    try {
      const res = await fetch(`${API_URL}/cadastros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastro),
      });
      const data = await res.json();
      setCadastros((prev) => [...prev, { ...cadastro, id: data.id }]);
    } catch (err) {
      console.error("Erro ao adicionar cadastro:", err);
    }
  };

  // Remover cadastro via backend
  const removeCadastro = async (id: number) => {
    try {
      await fetch(`${API_URL}/cadastros/${id}`, { method: "DELETE" });
      setCadastros((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao remover cadastro:", err);
    }
  };

  // Carregar cadastros quando o contexto iniciar
  useEffect(() => {
    fetchCadastros();
  }, []);

  return (
    <CadastroContext.Provider
      value={{ cadastros, addCadastro, removeCadastro, fetchCadastros }}
    >
      {children}
    </CadastroContext.Provider>
  );
}
