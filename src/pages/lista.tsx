// lista.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

type Coleta = {
  id: string;
  emitente: string;
  razao: string;
  foto?: string;
  data?: string;
};

export default function Lista() {
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const buscarColetas = async () => {
      const { data, error } = await supabase
        .from("coletas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar coletas:", error);
      } else {
        setColetas(data || []);
      }
    };

    buscarColetas();
  }, []);

  const coletasFiltradas = coletas.filter((c) =>
    c.emitente.toLowerCase().includes(filtro.toLowerCase()) ||
    c.razao.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={styles.listaPage}>
      <h1>Listagem de Coletas</h1>

      <input
        type="text"
        placeholder="Buscar por emitente ou razão social"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={styles.inputFiltro}
      />

      {coletasFiltradas.length === 0 && <p>Nenhum cadastro encontrado.</p>}

      <div className={styles.listaContainer}>
        {coletasFiltradas.map((cadastro, index) => (
          <div key={index} className={styles.itemCadastro}>
            <div className={styles.infoCadastro}>
              <p><strong>Emitente:</strong> {cadastro.emitente}</p>
              <p><strong>Razão Social:</strong> {cadastro.razao}</p>
              <p><strong>Data:</strong> {new Date(cadastro.data || "").toLocaleString()}</p>
            </div>

            {cadastro.foto && (
              <div className={styles.imagemCadastro}>
                <a href={cadastro.foto} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={cadastro.foto}
                    alt="Foto cadastrada"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                  />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.botaoVoltarContainer}>
        <Link href="/" className={styles.botaoVoltar}>
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
