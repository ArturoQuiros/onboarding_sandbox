// src/Global/components/Navbar/Navbar.jsx
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BsTranslate } from "react-icons/bs";
import { LanguageContext } from "../../../Global/Context";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { i18n } = useTranslation("global");
  const { setLanguage } = useContext(LanguageContext);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    setLanguage(newLang);
  };

  return (
    <nav className={styles.navbar}>
      <img
        src="https://cdn.bdo.global/images/bdo_logo/1.0.0/bdo_logo_color.png"
        alt="BDO logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>Costa Rica</h1>
      <div className={styles.menu}>
        <button
          type="button"
          className={styles.langButton}
          onClick={handleLanguageToggle}
          title="Cambiar idioma"
        >
          <BsTranslate className={styles.translateIcon} />
          <span>{i18n.language === "es" ? "EN" : "ES"}</span>
        </button>
      </div>
    </nav>
  );
};
