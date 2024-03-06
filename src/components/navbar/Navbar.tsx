"use client";

import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import map from "@/../public/mapLocation.svg";
import phone from "@/../public/phoneCall.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/../public/dslogo.png";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string | null>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const splittedPathname = pathname!.split("?")[0];
    setActiveLink(splittedPathname);
  }, [pathname]);

  const isActive = (path: string) => {
    return activeLink && activeLink.startsWith(path);
  };

  const [stickyClass, setStickyClass] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 && !isChecked
        ? setStickyClass(true)
        : setStickyClass(false);
    }
  };

  useEffect(() => {
    // Disable scrolling when isChecked is true
    if (isChecked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isChecked]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Link
        target="_blank"
        href={"https://maps.app.goo.gl/RDkqNTQpYAauXNwT7"}
        className={styles.locationDetails}
      >
        <img src={map.src} alt="map" />
        <p>20 avenue Gambetta 75020 paris</p>
      </Link>
      <div className={styles.logo}>
        <Link href={"/"}>
          <img className={styles.logoDestock} src={logo.src} />
        </Link>
      </div>
      <nav
        className={`${styles.nav} ${stickyClass ? styles.stickyNavbar : ""} ${
          isChecked ? styles.mobileNv : ""
        }`} // Apply mobileMenuOpen class based on isChecked state
      >
        <div className={styles.navContainer}>
          <ul>
            {stickyClass && !isChecked ? (
              <li className={styles.logoAnimated}>
                <Link href={"/"} style={{ color: "#fff" }}>
                  <h1 className="logo">Destock</h1>{" "}
                </Link>
              </li>
            ) : null}

            <div className={styles.links}>
              <li>
                <Link
                  className={activeLink === "/" ? styles.active : ""}
                  href="/"
                >
                  Accueil
                </Link>
              </li>
              <li className={styles.boutiqueContainer}>
                <div className={styles.dropdown}>
                  <button
                    className={` ${styles.dropbtn} ${
                      isActive("/products/alimentation") ||
                      isActive("/products/boissons") ||
                      isActive("/products/emballage")
                        ? styles.active
                        : ""
                    }`}
                  >
                    {"Boutique >"}
                  </button>
                  <div className={styles.dropdownContent}>
                    <Link
                      className={
                        isActive("/products/alimentation") ? styles.active : ""
                      }
                      href="/products/alimentation?page=1"
                    >
                      Alimentation
                    </Link>
                    <Link
                      className={
                        isActive("/products/boissons") ? styles.active : ""
                      }
                      href="/products/boissons?page=1"
                    >
                      Boissons
                    </Link>
                    <Link
                      className={
                        isActive("/products/emballage") ? styles.active : ""
                      }
                      href="/products/emballage?page=1"
                    >
                      Emballage
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  className={activeLink === "/about" ? styles.active : ""}
                  href="/about"
                >
                  À Propos de Nous
                </Link>
              </li>
            </div>
          </ul>
          <div className={styles.contact}>
            <img src={phone.src} alt="phone" />
            <Link target="_blank" href={"https://wa.link/rbq8s1"}>
              <p>+33 6 63 25 92 92</p>
            </Link>
          </div>
          <div className={styles.toggle}>
            <input
              id="checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            <label className="toggle" htmlFor="checkbox">
              <div id="bar1" className="bars"></div>
              <div id="bar2" className="bars"></div>
              <div id="bar3" className="bars"></div>
            </label>
          </div>
          {isChecked && (
            <ul className={styles.mobileLinks}>
              <li>
                <Link
                  className={activeLink === "/" ? styles.active : ""}
                  href="/"
                  onClick={handleToggle}
                >
                  Accueil
                </Link>
                <Link
                  className={
                    isActive("/products/alimentation") ? styles.active : ""
                  }
                  onClick={handleToggle}
                  href="/products/alimentation?page=1"
                >
                  Alimentation
                </Link>
                <Link
                  className={
                    isActive("/products/boissons") ? styles.active : ""
                  }
                  onClick={handleToggle}
                  href="/products/boissons?page=1"
                >
                  Boissons
                </Link>
                <Link
                  className={
                    isActive("/products/emballage") ? styles.active : ""
                  }
                  onClick={handleToggle}
                  href="/products/emballage?page=1"
                >
                  Emballage
                </Link>
                <Link
                  className={activeLink === "/about" ? styles.active : ""}
                  href="/about"
                  onClick={handleToggle}
                >
                  À Propos de Nous
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
