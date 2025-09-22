// src/Modules/Admin/components/Crud/CrudDashboard.jsx

import React, { useState, useEffect, useMemo } from "react";
import { CrudDataTable, CrudForm, SearchBar, ItemsPerPageSelector } from "./";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import styles from "./CrudDashboard.module.css";
import { ConfirmModal } from "./ConfirmModal";
import { FaPlus } from "react-icons/fa";

export const CrudDashboard = ({
  entityName,
  fields,
  getItems,
  createItem,
  updateItem,
  deleteItem,
}) => {
  const { t } = useTranslation("global");
  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        toast.error(t("common.loadError"));
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, [getItems, t]);

  // --- Lógica de filtrado, ordenamiento y paginación

  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const sortedItems = useMemo(() => {
    if (!sortKey) return items;

    const sorted = [...items].sort((a, b) => {
      const aValue = String(a[sortKey] || "").toLowerCase();
      const bValue = String(b[sortKey] || "").toLowerCase();

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return sorted;
  }, [items, sortKey, sortDirection]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;

    return sortedItems.filter((item) =>
      fields.some((field) =>
        String(item[field.key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedItems, searchTerm, fields]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // --- Manejo de acciones (crear, editar, eliminar)

  const handleCreate = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id) => {
    setItemIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false);
    try {
      await toast.promise(deleteItem(itemIdToDelete), {
        loading: t(`${entityName}.deleting`),
        success: t(`${entityName}.deleteSuccess`),
        error: t(`${entityName}.deleteError`),
      });
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setItemIdToDelete(null);
    }
  };

  const handleSave = async (item) => {
    const isEditing = !!selectedItem;
    const promise = isEditing ? updateItem(item) : createItem(item);

    try {
      await toast.promise(promise, {
        loading: isEditing ? t("common.updating") : t("common.creating"),
        success: isEditing
          ? t("common.updateSuccess")
          : t("common.createSuccess"),
        error: t("common.genericError"),
      });

      setIsFormOpen(false);
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // --- Renderizado del componente

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t(`${entityName}.title`)}</h2>
        <button className={styles.createButton} onClick={handleCreate}>
          <FaPlus /> {t(`${entityName}.createButton`)}
        </button>
      </div>

      {isFormOpen ? (
        <CrudForm
          fields={fields}
          item={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className={styles.controlsBar}>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ItemsPerPageSelector
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>

          <CrudDataTable
            data={paginatedItems}
            fields={fields}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            filteredCount={filteredItems.length}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onSort={handleSort}
            sortKey={sortKey}
            sortDirection={sortDirection}
          />
        </>
      )}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
        messageKey={`${entityName}.confirmDelete`}
        type="delete"
      />
    </div>
  );
};
