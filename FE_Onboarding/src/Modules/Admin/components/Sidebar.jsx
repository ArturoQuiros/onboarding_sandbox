import React, {
  useContext,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  BsArrowBarLeft,
  BsList,
  BsHouse,
  BsGlobeAmericas,
  BsPeople,
  BsTools,
  BsPerson,
  BsNewspaper,
} from "react-icons/bs";
import { UIContext } from "../../../Global/Context";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { t } = useTranslation("global");
  const { isSidebarOpen, setIsSidebarOpen, setActiveEntity } =
    useContext(UIContext);
  const location = useLocation();

  // 👈 Usamos useMemo para evitar que se cree un nuevo array en cada render
  const menuItems = useMemo(
    () => [
      { icon: <BsHouse />, label: t("sidebar.home"), path: "/admin" },
      {
        icon: <BsGlobeAmericas />,
        label: t("sidebar.countries"),
        path: "/admin/countries",
      },
      {
        icon: <BsPerson />,
        label: t("sidebar.customers"),
        path: "/admin/customers",
      },
      {
        icon: <BsTools />,
        label: t("sidebar.services"),
        path: "/admin/services",
      },
      {
        icon: <BsPeople />,
        label: t("sidebar.users"),
        path: "/admin/users",
      },
      {
        icon: <BsNewspaper />,
        label: t("sidebar.contracts"),
        path: "/admin/contracts",
      },
    ],
    [t]
  ); // 👈 La única dependencia es la función de traducción 't'

  const sidebarClasses = isSidebarOpen
    ? styles.sidebar
    : `${styles.sidebar} ${styles.sidebarClosed}`;

  const itemRefs = useRef([]);
  const [activeStyle, setActiveStyle] = useState({ top: 0, height: 0 });

  useLayoutEffect(() => {
    const activeIndex = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const el = itemRefs.current[activeIndex];
      const { offsetTop, offsetHeight } = el;
      setActiveStyle({ top: offsetTop, height: offsetHeight });
    }
  }, [location.pathname, isSidebarOpen, menuItems]);

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
            <Link
              to={item.path}
              key={idx}
              className={linkClasses}
              ref={(el) => (itemRefs.current[idx] = el)}
              onClick={() => {
                setActiveEntity({
                  name: item.label,
                  icon: item.icon,
                });
                if (!isSidebarOpen) {
                  setIsSidebarOpen(true);
                }
              }}
            >
              <span className={styles.icon}>{item.icon}</span>
              {isSidebarOpen && (
                <span className={styles.text}>{item.label}</span>
              )}
            </Link>
          );
        })}

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
