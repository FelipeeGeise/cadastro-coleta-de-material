// Main.tsx
import styles from "@/styles/Home.module.css";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CadastroContext } from "@/contexts/CadastroContext";
import Link from "next/link";

export default function Main({ fotoDoArticle }: { fotoDoArticle: string | null }) {
  const { addCadastro } = useContext(CadastroContext);

  const [emitente, setEmitente] = useState("");
  const [razao, setRazao] = useState("");
  const [showEmpresas, setShowEmpresas] = useState(false);
  const [showRazoes, setShowRazoes] = useState(false);

  const empresas = ["KG-MLAN", "MUNDO DA IMPERMEABILIZAÇÃO", "ESPERANÇA NORDESTE", "MAFEMA", "BORGES","NORDESTE FIXAÇÕES","ARCELOR MITTAL","SN-TUDO HIDRÁULICO",];
  const razoes = ["PRATERIA","ROTAME","JÃO CARLOS","RODHES","DLT","TDS","JOÃO GUILHERME","FT ENGENHARIA",];

  const router = useRouter(); // ✅ dentro da função

  const handleSalvar = () => {
    if (!emitente || !razao) return alert("Preencha todos os campos!");

    addCadastro({
      emitente,
      razao,
      foto: fotoDoArticle || "",
      data: new Date().toISOString()
    });

    // Redireciona para a página de sucesso
    router.push("/Sucesso");
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
    </main>
  );
}
