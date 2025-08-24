// Main.tsx
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient"; // ✅ Importa o Supabase
import Link from "next/link";

// Tipagem dos dados de coleta
type Coleta = {
  id?: string;
  emitente?: string;
  razao?: string;
  foto?: string;
  data?: string;
};

type MainProps = {
  fotoDoArticle: string | null;
  coletas: Coleta[];
};

export default function Main({ fotoDoArticle, coletas }: MainProps) {
  const [emitente, setEmitente] = useState("");
  const [razao, setRazao] = useState("");
  const [showEmpresas, setShowEmpresas] = useState(false);
  const [showRazoes, setShowRazoes] = useState(false);

  const empresas = [
    "KG-MLAN", "MUNDO DA IMPERMEABILIZAÇÃO", "ESPERANÇA NORDESTE", "MAFEMA",
    "BORGES", "NORDESTE FIXAÇÕES", "ARCELOR MITTAL", "SN-TUDO HIDRÁULICO"
  ];
  const razoes = [
    "PRATERIA", "ROTAME", "JÃO CARLOS", "RODHES", "DLT", "TDS",
    "JOÃO GUILHERME", "FT ENGENHARIA"
  ];

  const router = useRouter();

  // ✅ Salva no Supabase
  const handleSalvar = async () => {
    if (!emitente || !razao) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("coletas")
      .insert([
        {
          emitente,
          razao,
          foto: fotoDoArticle || "",
          data: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      alert("Erro ao salvar. Tente novamente.");
    } else {
      router.push("/Sucesso");
    }
  };

  return (
    <main className={styles.main}>
      {/* COLETA */}
      <div className={styles.campo}>
        <label className={styles.labelCampo}>COLETA</label>
        <div className={styles.fakeSelect} onClick={() => setShowEmpresas(!showEmpresas)}>
          <span>{emitente || "Escolha uma coleta"}</span>
          <span className={`${styles.seta} ${showEmpresas ? styles.setaAberta : ""}`}>V</span>
        </div>
        {showEmpresas && (
          <div className={styles.dropdownList}>
            {empresas.map((empresa, i) => (
              <div
                key={i}
                className={styles.dropdownItem}
                onClick={() => {
                  setEmitente(empresa);
                  setShowEmpresas(false);
                }}
              >
                {empresa}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RAZÃO SOCIAL */}
      <div className={styles.campo}>
        <label className={styles.labelCampo}>RAZÃO SOCIAL</label>
        <div className={styles.fakeSelect} onClick={() => setShowRazoes(!showRazoes)}>
          <span>{razao || "Escolha uma razão social"}</span>
          <span className={`${styles.seta} ${showRazoes ? styles.setaAberta : ""}`}>V</span>
        </div>
        {showRazoes && (
          <div className={styles.dropdownList}>
            {razoes.map((r, i) => (
              <div
                key={i}
                className={styles.dropdownItem}
                onClick={() => {
                  setRazao(r);
                  setShowRazoes(false);
                }}
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTÕES SALVAR E LISTA */}
      <div className={styles.salvaElista}>
        <button className={styles.salvar} onClick={handleSalvar}>SALVAR</button>
        <Link href="/lista" className={styles.listar}>LISTA</Link>
      </div>

      {/* Exibir coletas recebidas */}
      {coletas.length > 0 && (
        <div className={styles.listaColetas}>
          <h2>Coletas Recentes</h2>
          <ul>
            {coletas.map((c, i) => (
              <li key={i}>
                <strong>{c.emitente}</strong> — {c.razao} ({c.data?.slice(0, 10)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
