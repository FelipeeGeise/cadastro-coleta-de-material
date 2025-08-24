import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

// Importando os componentes separados
import Section from "@/components/section/section";
import Main from "@/components/main/main";
import Article from "@/components/article/article";
import { useState } from "react";

export default function Home() {
  // State para compartilhar a foto do Article com o Main
  const [fotoDoArticle, setFotoDoArticle] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Cadastro de Coleta</title>
        <meta name="description" content="Cadastro de Coleta Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.corpoDoProjeto}>
        <header className={styles.cabecalho}>
          <Image src="/img/carrinho.png" alt="carrinho" width={150} height={150} />
          <h1>Cadastro de coleta</h1>
        </header>

        {/* Section logo abaixo do header */}
        <Section />

        <div className={styles.mainArticle}>
          <Main fotoDoArticle={fotoDoArticle} />
          <Article setFotoDoArticle={setFotoDoArticle} />
        </div>

        <footer>
          <ul>
            <li></li>
          </ul>
        </footer>
      </div>
    </>
  );
}
