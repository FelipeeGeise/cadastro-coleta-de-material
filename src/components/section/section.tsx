import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Section() {
  return (
    <section className={styles.section}>
      <Link href="/" className={styles.divSection}>
        📄 COLETA
      </Link>
      <Link href="/destino" className={styles.divSection}>
        🚗 DESTINO
      </Link>
    </section>
  );
}
