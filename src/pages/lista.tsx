// src/pages/lista.tsx
import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import { CadastroContext, Cadastro } from "@/contexts/CadastroContext";
import Image from "next/image";
import Link from "next/link";

export default function Lista() {
  const { cadastros, removeCadastro } = useContext(CadastroContext); // pega cadastros e função de remover

  return (
    <div className={styles.listaPage}>
      <h1>Listagem de Cadastros</h1>

      {/* Se não houver cadastros */}
      {cadastros.length === 0 && <p>Nenhum cadastro salvo.</p>}

      <div className={styles.listaContainer}>
        {cadastros.map((cadastro: Cadastro, index: number) => (
          <div key={index} className={styles.itemCadastro}>
            {/* Dados do cadastro */}
            <div className={styles.infoCadastro}>
              <p><strong>Emitente:</strong> {cadastro.emitente}</p>
              <p><strong>Razão Social:</strong> {cadastro.razao}</p>
              <p><strong>Data:</strong> {new Date(cadastro.data).toLocaleString()}</p>
            </div>

            {/* Imagem do cadastro */}
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

            {/* Botão de excluir */}
            <button
              className={styles.botaoExcluir}
              onClick={() => removeCadastro(index)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      {/* Botão Voltar ao Início */}
      <div className={styles.botaoVoltarContainer}>
        <Link href="/" className={styles.botaoVoltar}>
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
