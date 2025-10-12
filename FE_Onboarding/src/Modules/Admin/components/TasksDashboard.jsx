import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { CrudDataTable, SearchBar, ItemsPerPageSelector } from "./";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import styles from "./TasksDashboard.module.css";
import { FaPlus } from "react-icons/fa";
import { UIContext } from "../../../Global/Context";
import { useNavigate } from "react-router-dom";

export const TasksDashboard = ({
  entityName,
  fields,
  getItems,
  extraActionRenderer,
  serviceId,
}) => {
  const { t } = useTranslation("global");
  const { entityIcon } = useContext(UIContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // 🔹 Carga inicial de items
  const reloadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(t("common.loadError"));
    } finally {
      setIsLoading(false);
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

  // 🔹 Redirigir a crear tarea
  const handleCreate = () => {
    navigate(`/admin/services/${serviceId}/tasks/new`);
  };

  // 🔹 Redirigir a editar tarea
  const handleEdit = (item) => {
    navigate(`/admin/services/${serviceId}/tasks/${item.id}`);
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

      {!isLoading && (
        <div className={styles.controlsBar}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ItemsPerPageSelector
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {isLoading ? (
        <p className={styles.loadingMessage}>{t("common.loading")}</p>
      ) : (
        <CrudDataTable
          data={paginatedItems}
          fields={fields}
          onEdit={handleEdit} // 🔹 ahora redirige
          extraActionRenderer={extraActionRenderer}
          currentPage={currentPage}
          totalPages={totalPages}
          filteredCount={filteredItems.length}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onSort={handleSort}
          sortKey={sortKey}
          sortDirection={sortDirection}
        />
      )}
    </div>
  );
};
