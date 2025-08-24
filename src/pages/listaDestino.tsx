import { useContext } from "react";
import { CadastroDestinoContext } from "@/contexts/CadastroDestinoContext";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function ListaDestino() {
  const { cadastrosDestino, removeCadastroDestino } = useContext(CadastroDestinoContext);

  return (
    <div className={styles.listaPage}>
      <h1>Cadastros do Destino</h1>

      {cadastrosDestino.length === 0 && <p>Nenhum cadastro salvo.</p>}

      <div className={styles.listaContainer}>
        {cadastrosDestino.map((cadastro, index) => (
          <div key={index} className={styles.itemCadastro}>
            <div className={styles.infoCadastro}>
              <p><strong>Empresa:</strong> {cadastro.empresa}</p>
              <p><strong>Observação:</strong> {cadastro.obs}</p>
              <p><strong>Data:</strong> {new Date(cadastro.data).toLocaleString()}</p>
            </div>

            {cadastro.foto && (
              <div className={styles.imagemCadastro}>
                <a href={cadastro.foto} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={cadastro.foto}
                    alt="Foto"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                  />
                </a>
              </div>
            )}

            <button className={styles.botaoExcluir} onClick={() => removeCadastroDestino(index)}>Excluir</button>
          </div>
        ))}
      </div>

      <div className={styles.botaoVoltarContainer}>
        <Link href="/destino" className={styles.botaoVoltar}>Voltar</Link>
      </div>
    </div>
  );
}
