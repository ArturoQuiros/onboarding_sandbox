import React, { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle, FaKey } from "react-icons/fa";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  // 🆕 Datos Mock: Deberían venir de props o contexto real
  const userName = "Jane Doe";
  // ❌ ELIMINADO: notificationCount

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    console.log("PENDIENTE LOGOUT CLIENTE");
    setIsDropdownOpen(false);
  };

  const handleChangePassword = () => {
    console.log("PENDIENTE NAVEGAR/ABRIR MODAL DE CAMBIAR CONTRASEÑA");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className={styles.navbar}>
      <img
        src="https://cdn.bdo.global/images/bdo_logo/1.0.0/bdo_logo_color.png"
        alt="BDO logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>Costa Rica</h1>

      <div className={styles.menu}>
        {/* ❌ ELIMINADO: Icono de Notificaciones */}

        {/* 🆕 Nombre del Usuario */}
        <span className={styles.userName}>{userName}</span>

        {/* Contenedor del Círculo de Usuario y Menú Desplegable */}
        <div className={styles.userDropdownContainer} ref={dropdownRef}>
          <button
            className={styles.userCircleButton}
            onClick={toggleDropdown}
            aria-label="Menú de usuario"
          >
            <FaUserCircle className={styles.userIcon} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div
                className={styles.dropdownItem}
                onClick={handleChangePassword}
              >
                <FaKey className={styles.dropdownIcon} />
                Change Password
              </div>

              <div
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogOut}
              >
                <FiLogOut className={styles.dropdownIcon} />
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
