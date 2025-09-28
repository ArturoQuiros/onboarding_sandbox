import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  entityIcon,
  validations,
}) => {
  const { t } = useTranslation("global");

  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const reloadItems = useCallback(async () => {
    try {
      const data = await getItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(t("common.loadError"));
    }
  }, [getItems, t]);

  useEffect(() => {
    reloadItems();
  }, [reloadItems]);

  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const sortedItems = useMemo(() => {
    if (!sortKey) return items;
    return [...items].sort((a, b) => {
      const aValue = String(a[sortKey] ?? "").toLowerCase();
      const bValue = String(b[sortKey] ?? "").toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [items, sortKey, sortDirection]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return sortedItems;
    return sortedItems.filter((item) =>
      fields.some((field) =>
        String(item[field.key] ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedItems, searchTerm, fields]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
    const id = itemIdToDelete;

    try {
      // Optimistic update: quitar del estado local antes de esperar respuesta
      setItems((prev) => prev.filter((i) => i.id !== id));

      await toast.promise(deleteItem(id), {
        loading: t(`${entityName}.deleting`),
        success: t(`${entityName}.deleteSuccess`),
        error: t(`${entityName}.deleteError`),
      });
    } catch (error) {
      console.error(error);
      // Si falla, recargamos para volver al estado real
      reloadItems();
    } finally {
      setItemIdToDelete(null);
    }
  };

  const handleSave = async (item) => {
    const isEditing = Boolean(selectedItem);

    try {
      if (isEditing) {
        // Optimistic update: actualizamos localmente
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, ...item } : i))
        );

        await toast.promise(updateItem(item), {
          loading: t("common.updating"),
          success: t("common.updateSuccess"),
          error: t("common.genericError"),
        });
      } else {
        // Optimistic update: agregamos temporalmente
        const tempId = Date.now(); // ID temporal
        const newItem = { ...item, id: tempId };
        setItems((prev) => [...prev, newItem]);

        const created = await toast.promise(createItem(item), {
          loading: t("common.creating"),
          success: t("common.createSuccess"),
          error: t("common.genericError"),
        });

        // Reemplazamos el temporal con el real devuelto por la API
        setItems((prev) => prev.map((i) => (i.id === tempId ? created : i)));
      }

      setIsFormOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error(error);
      reloadItems(); // fallback si algo falla
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {entityIcon && <span className={styles.icon}>{entityIcon}</span>}
          {t(`${entityName}.title`)}
        </h2>
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
          validations={validations}
          entityIcon={entityIcon}
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
