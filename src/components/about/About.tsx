import Link from "next/link";
import styles from "./about.module.css";
import mapSnapshot from "@/../public/snapshotMap.jpg";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.general}>
            <h2>Destock</h2>
            <p>
              Morbi cursus porttitor enim lobortis molestie. <br />
              Duis gravida turpis dui, eget bibendum magna <br /> congue nec.
            </p>
            <p className={styles.contact}>
              <span className={styles.phoneNumber}>+33 6 63 25 92 92</span>{" "}
              <span style={{ color: "#808080" }}>or</span>{" "}
              <span className={styles.email}>mokhtarnas@hotmail.fr</span>
            </p>
          </div>
          <div className={styles.categories}>
            <h3>Categories</h3>
            <ul>
              <li>
                <Link href="/products/alimentation?page=1">Alimentation</Link>
              </li>
              <li>
                <Link href="/products/boissons?page=1">Boissons</Link>
              </li>
              <li>
                <Link href="/products/emballage?page=1">Emballage</Link>
              </li>
            </ul>
          </div>
        </div>
        <Link
          className={styles.mapSnapshot}
          target="_blank"
          href="https://maps.app.goo.gl/RDkqNTQpYAauXNwT7"
        >
          <img src={mapSnapshot.src} alt="map" />
        </Link>
      </div>
      <div className={styles.bottom}>
        <p>Destock © 2024. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default About;
