import React, { useContext } from "react";
import { BsTranslate } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi"; // 👈 Importamos el ícono de Logout
import { LanguageContext, UIContext } from "../../../Global/Context";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t, i18n } = useTranslation("global"); // 👈 Aseguramos 't' para traducciones
  const { setLanguage } = useContext(LanguageContext);

  const handleLanguageToggle = () => {
    setLanguage(i18n.language === "es" ? "en" : "es");
  };

  // 1. Función simulada de Logout
  const handleLogout = () => {
    // En una aplicación real, aquí pondrías la lógica para:
    // 1. Eliminar el token de autenticación (localStorage/cookies).
    // 2. Redirigir al usuario a la página de login.
    console.log("Logout iniciado...");
    alert("Cerrar Sesión: Lógica de autenticación implementada aquí.");
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
        {/* Botón de Idioma */}
        <button className={styles.langButton} onClick={handleLanguageToggle}>
          <BsTranslate className={styles.translateIcon} />
          <span>{i18n.language === "es" ? "ES" : "EN"}</span>
        </button>

        {/* 2. Botón de Logout */}
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FiLogOut className={styles.logoutIcon} />
          <span>{t("common.logout")}</span> {/* Usamos traducción */}
        </button>
      </div>
    </nav>
  );
};
