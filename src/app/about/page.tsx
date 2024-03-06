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
          Nous sommes votre destination de choix pour des solutions de
          déstockage d'emballages et de produits alimentaires de haute qualité à
          des prix compétitifs. Chez MB DESTOCK, nous nous engageons à fournir à
          nos clients une vaste gamme d'options pour répondre à leurs besoins en
          matière d'emballage et d'alimentation, tout en offrant des solutions
          économiques et durables.
        </p>
        <p>
          Que vous soyez une petite entreprise à la recherche de fournitures
          d'emballage abordables ou une grande entreprise à la recherche de
          solutions de déstockage en vrac, nous avons ce qu'il vous faut. Notre
          inventaire comprend une variété d'emballages, allant des boîtes aux
          sacs en passant par les récipients, ainsi qu'une sélection de produits
          alimentaires de qualité, allant des conserves aux produits secs.
        </p>
        <p>
          En tant que partenaire de confiance pour de nombreuses entreprises,
          nous nous efforçons de fournir un service exceptionnel à chaque étape
          de votre expérience d'achat. Notre équipe dévouée est là pour vous
          guider et répondre à toutes vos questions, et notre processus de
          commande simple et efficace garantit une livraison rapide et fiable.
        </p>
      </div>
    </div>
  );
}
