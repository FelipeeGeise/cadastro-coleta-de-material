import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

export default function SucessoDestino() {
  const router = useRouter();
  const { empresa, obs, foto, data } = router.query;

  return (
    <div className={styles.corpoDoProjeto}>
      <header className={styles.cabecalho}>
        <h1>✅ Cadastro de Destino Salvo!</h1>
      </header>

      <div className={styles.container}>
        <div className={styles.field}>
          <h2>Razão Social:</h2>
          <p>{empresa}</p>
        </div>

        <div className={styles.field}>
          <h2>Observações:</h2>
          <p>{obs}</p>
        </div>

        <div className={styles.field}>
          <h2>Data:</h2>
          <p>{data}</p>
        </div>

        {foto && (
          <div className={styles.field}>
            <h2>Imagem:</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={String(foto)} alt="foto salva" width={200} />
          </div>
        )}

        <button className={styles.salvar} onClick={() => router.push("/")}>
          VOLTAR PARA INÍCIO
        </button>
      </div>
    </div>
  );
}
