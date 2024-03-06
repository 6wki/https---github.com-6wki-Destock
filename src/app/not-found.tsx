import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404</h1>
      <div className={styles.errorMessage}>Page non trouvée</div>
      <Link href="/" className={styles.button}>
        <span className={styles.shadow}></span>
        <span className={styles.edge}></span>
        <span className={`${styles.front} ${styles.text}`}>
          {" "}
          Aller à la page d'accueil{" "}
        </span>
      </Link>
    </main>
  );
}
