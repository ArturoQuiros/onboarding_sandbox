import React, { useState, useEffect } from "react";
import { DataTable, CrudForm, ConfirmModal } from "./";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import styles from "./CrudDashboard.module.css";

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchData();
  }, [getItems]);

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
    try {
      await toast.promise(deleteItem(itemIdToDelete), {
        loading: t(`${entityName}.deleting`),
        success: t(`${entityName}.deleteSuccess`),
        error: t(`${entityName}.deleteError`),
      });
      setItems(items.filter((item) => item.id !== itemIdToDelete));
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
      // El toast ya maneja el error, por lo que no es necesario un `catch` adicional aquí
    }
    setIsConfirmModalOpen(false);
    setItemIdToDelete(null);
  };

  const handleSave = async (item) => {
    const promise = selectedItem
      ? updateItem(item)
      : createItem({ name: item.name });

    try {
      await toast.promise(promise, {
        loading: selectedItem ? t("common.updating") : t("common.creating"),
        success: selectedItem
          ? t("common.updateSuccess")
          : t("common.createSuccess"),
        error: t("common.genericError"),
      });

      setIsFormOpen(false);
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error al guardar el elemento:", error);
      // El toast ya maneja el error, por lo que no es necesario un `catch` adicional aquí
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t(`${entityName}.title`)}</h2>
        <button className={styles.createButton} onClick={handleCreate}>
          {t(`${entityName}.createButton`)}
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
        <DataTable
          data={items}
          fields={fields}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
        messageKey={`${entityName}.confirmDelete`}
      />
    </div>
  );
};
