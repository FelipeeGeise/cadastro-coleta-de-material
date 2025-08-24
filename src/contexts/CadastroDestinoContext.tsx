import { createContext, useState, ReactNode, useEffect } from "react";

export interface CadastroDestino {
  id?: number; // id agora vem do banco
  empresa: string;
  foto: string;
  obs: string;
  data: string;
}

interface CadastroDestinoContextType {
  cadastrosDestino: CadastroDestino[];
  addCadastroDestino: (cadastro: CadastroDestino) => Promise<void>;
  removeCadastroDestino: (id: number) => Promise<void>;
  fetchCadastrosDestino: () => Promise<void>;
}

export const CadastroDestinoContext = createContext<CadastroDestinoContextType>({
  cadastrosDestino: [],
  addCadastroDestino: async () => {},
  removeCadastroDestino: async () => {},
  fetchCadastrosDestino: async () => {},
});

export function CadastroDestinoProvider({ children }: { children: ReactNode }) {
  const [cadastrosDestino, setCadastrosDestino] = useState<CadastroDestino[]>([]);

  const API_URL = "http://localhost:4000"; // endereço do backend

  // Buscar cadastros do backend
  const fetchCadastrosDestino = async () => {
    try {
      const res = await fetch(`${API_URL}/cadastrosDestino`);
      const data = await res.json();
      setCadastrosDestino(data);
    } catch (err) {
      console.error("Erro ao buscar cadastrosDestino:", err);
    }
  };

  // Adicionar cadastro via backend
  const addCadastroDestino = async (cadastro: CadastroDestino) => {
    try {
      const res = await fetch(`${API_URL}/cadastrosDestino`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastro),
      });
      const data = await res.json();
      setCadastrosDestino((prev) => [...prev, { ...cadastro, id: data.id }]);
    } catch (err) {
      console.error("Erro ao adicionar cadastroDestino:", err);
    }
  };

  // Remover cadastro via backend
  const removeCadastroDestino = async (id: number) => {
    try {
      await fetch(`${API_URL}/cadastrosDestino/${id}`, { method: "DELETE" });
      setCadastrosDestino((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao remover cadastroDestino:", err);
    }
  };

  // Carregar cadastros quando o contexto iniciar
  useEffect(() => {
    fetchCadastrosDestino();
  }, []);

  return (
    <CadastroDestinoContext.Provider
      value={{ cadastrosDestino, addCadastroDestino, removeCadastroDestino, fetchCadastrosDestino }}
    >
      {children}
    </CadastroDestinoContext.Provider>
  );
}
