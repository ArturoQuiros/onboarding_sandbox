// src/Modules/Admin/components/Sidebar/Sidebar.jsx
import React, { useContext } from "react";
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

  return (
    <div className={sidebarClasses}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isSidebarOpen ? <BsArrowBarLeft /> : <BsList />}
      </button>
      <div className={styles.menu}>
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const linkClasses = isActive
            ? `${styles.menuItem} ${styles.menuItemActive}`
            : styles.menuItem;

          return (
            <Link to={item.path} key={idx} className={linkClasses} tabIndex={0}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.text}>{item.label}</span>
              {isActive && <div className={styles.activeBar} />}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
