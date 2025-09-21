import React, { useState, useEffect } from "react";
import { DataTable, CrudForm } from "./";
import { useTranslation } from "react-i18next";
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

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSave = async (item) => {
    if (item.id) {
      const updatedItem = await updateItem(item);
      setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    } else {
      const newItem = await createItem(item);
      setItems([...items, newItem]);
    }
    setIsFormOpen(false);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
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
    </div>
  );
};
