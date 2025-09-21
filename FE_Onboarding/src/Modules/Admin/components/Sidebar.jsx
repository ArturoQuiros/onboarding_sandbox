// src/Modules/Admin/components/Sidebar/Sidebar.jsx
import React, { useContext, useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
  BsArrowBarLeft,
  BsList,
  BsHouse,
  BsGlobeAmericas,
  BsPeople,
  BsPersonBadge,
} from "react-icons/bs";
import { UIContext } from "../../../Global/Context";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { t } = useTranslation("global");
  const { isSidebarOpen, setIsSidebarOpen } = useContext(UIContext);
  const location = useLocation();

  const menuItems = [
    { icon: <BsHouse />, label: t("sidebar.home"), path: "/admin" },
    {
      icon: <BsGlobeAmericas />,
      label: t("sidebar.countries"),
      path: "/admin/countries",
    },
    { icon: <BsPeople />, label: t("sidebar.staff"), path: "/admin/staff" },
    {
      icon: <BsPersonBadge />,
      label: t("sidebar.customers"),
      path: "/admin/customers",
    },
  ];

  const sidebarClasses = isSidebarOpen
    ? styles.sidebar
    : `${styles.sidebar} ${styles.sidebarClosed}`;

  // refs y estado para la barra activa
  const menuRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeStyle, setActiveStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const activeIndex = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const el = itemRefs.current[activeIndex];
      const { offsetTop, offsetHeight } = el;
      setActiveStyle({ top: offsetTop, height: offsetHeight });
    }
  }, [location.pathname, isSidebarOpen]); // recalcula al cambiar de ruta o al abrir/cerrar sidebar

  return (
    <div className={sidebarClasses}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isSidebarOpen ? <BsArrowBarLeft /> : <BsList />}
      </button>

      <div className={styles.menu} ref={menuRef}>
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const linkClasses = isActive
            ? `${styles.menuItem} ${styles.menuItemActive}`
            : styles.menuItem;

          return (
            <Link
              to={item.path}
              key={idx}
              className={linkClasses}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.text}>{item.label}</span>
            </Link>
          );
        })}
        {/* Barra activa */}
        <div
          className={styles.activeBar}
          style={{
            top: activeStyle.top,
            height: activeStyle.height,
          }}
        />
      </div>
    </div>
  );
};
