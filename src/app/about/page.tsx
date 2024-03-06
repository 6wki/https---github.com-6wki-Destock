import banner from "@/../public/aboutBanner.svg";
import styles from "./about.module.css";

export default function AboutUs() {
  return (
    <div className={styles.about}>
      <div className={styles.banner}>
        <img src={banner.src} alt="banner" />
      </div>
      <div className={styles.content}>
        <h1>About Us</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed text, and a search for 'lorem ipsum' will uncover
          many web sites still in their infancy. Various versions have{" "}
        </p>
        <h1>Hey Shoppers!</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed text, and a search for 'lorem ipsum' will uncover
          many web sites still in their infancy. Various versions have{" "}
        </p>
      </div>
    </div>
  );
}
