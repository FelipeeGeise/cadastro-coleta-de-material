import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function Sucesso() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image src="/img/sucessoOK.png" alt="sucessoOK" width={600} height={600} />
        <p>Cadastro realizado com sucesso!</p>
        <Link href="/" className={styles.botaoVoltar}>Voltar</Link>
      </div>
    </div>
  );
}
