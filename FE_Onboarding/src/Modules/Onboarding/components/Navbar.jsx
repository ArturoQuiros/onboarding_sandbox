import React, { useContext } from "react";
import { BsTranslate } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { LanguageContext } from "../../../Global/Context";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t, i18n } = useTranslation("global");
  const { setLanguage } = useContext(LanguageContext);
  const { logout } = useAuth(); // ✅ Solo se llama una vez

  const handleLanguageToggle = () => {
    setLanguage(i18n.language === "es" ? "en" : "es");
  };

  const handleLogOut = () => {
    console.log("PENDIENTE LOGOUT CLIENTE");
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
        <button className={styles.langButton} onClick={handleLanguageToggle}>
          <BsTranslate className={styles.translateIcon} />
          <span>{i18n.language === "es" ? "ES" : "EN"}</span>
        </button>

        <button className={styles.logoutButton} onClick={handleLogOut}>
          <FiLogOut className={styles.logoutIcon} />
          <span>{t("common.logout")}</span>
        </button>
      </div>
    </nav>
  );
};
