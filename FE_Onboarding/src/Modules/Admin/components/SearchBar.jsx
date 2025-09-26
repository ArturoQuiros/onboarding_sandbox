// src/Modules/Admin/components/Crud/SearchBar.jsx

import React from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className={styles.searchBar}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};
