import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

export interface CadastroDestino {
  id?: number;
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const fetchCadastrosDestino = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/cadastrosDestino`);
      const data = await res.json();
      setCadastrosDestino(data);
    } catch (err) {
      console.error("Erro ao buscar cadastrosDestino:", err);
    }
  }, [API_URL]);

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

  const removeCadastroDestino = async (id: number) => {
    try {
      await fetch(`${API_URL}/cadastrosDestino/${id}`, { method: "DELETE" });
      setCadastrosDestino((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao remover cadastroDestino:", err);
    }
  };

  useEffect(() => {
    fetchCadastrosDestino();
  }, [fetchCadastrosDestino]);

  return (
    <CadastroDestinoContext.Provider
      value={{
        cadastrosDestino,
        addCadastroDestino,
        removeCadastroDestino,
        fetchCadastrosDestino,
      }}
    >
      {children}
    </CadastroDestinoContext.Provider>
  );
}
