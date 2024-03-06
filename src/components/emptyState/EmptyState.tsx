import Link from "next/link";
import styles from "./emptyState.module.css";
import emptyState from "@/../public/noProduct.png";

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <i className={styles.ionSadOutline}></i>
      <img src={emptyState.src} alt="no product" />
      <h3 className="">Aucun produit</h3>
      <p>Il n'y a aucun produit sur cette page</p>
      <Link href="/" className={styles.button}>
        <span className={styles.shadow} />
        <span className={styles.edge} />
        <span className={`${styles.front} ${styles.text}`}>
          {" "}
          Aller à la page d'accueil{" "}
        </span>
      </Link>
    </div>
  );
};

export default EmptyState;
