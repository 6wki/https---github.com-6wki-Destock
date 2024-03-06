import styles from "./loading.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.superballs}>
        <div className={styles.superballsDot}></div>
        <div className={styles.superballsDot}></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
