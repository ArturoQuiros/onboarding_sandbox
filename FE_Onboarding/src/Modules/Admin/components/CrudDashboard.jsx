import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import {
  CrudDataTable,
  CrudForm,
  SearchBar,
  ItemsPerPageSelector,
  Spinner,
} from "./";
import styles from "./CrudDashboard.module.css";
import { ConfirmModal } from "./ConfirmModal";
import { UIContext } from "../../../Global/Context";

/**
 * Dashboard CRUD genérico y reutilizable
 * Proporciona funcionalidad completa de Create, Read, Update, Delete
 * con búsqueda, paginación y ordenamiento
 */
export const CrudDashboard = ({
  entityName,
  fields,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  validations,
  extraActionRenderer,
}) => {
  const { t } = useTranslation("global");
  const { entityIcon } = useContext(UIContext);
  const navigate = useNavigate();

  // ============================================
  // 🎛️ ESTADOS
  // ============================================

  const [items, setItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // ============================================
  // 📊 CARGA DE DATOS
  // ============================================

  /**
   * Recarga todos los items desde el servidor
   */
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

  // ============================================
  // 🧮 COMPUTED VALUES - Ordenamiento, filtrado, paginación
  // ============================================

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

  // ============================================
  // 🎬 HANDLERS - Eventos
  // ============================================

  /**
   * Abre el formulario para crear un nuevo item
   */
  const handleCreate = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  /**
   * Abre el formulario para editar un item existente
   */
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  /**
   * Cancela la edición/creación y cierra el formulario
   */
  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  /**
   * Solicita confirmación para eliminar un item
   */
  const handleDelete = (id) => {
    setItemIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  /**
   * Confirma y ejecuta la eliminación del item
   */
  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false);
    try {
      await toast.promise(deleteItem(itemIdToDelete), {
        loading: t(`${entityName}.deleting`),
        success: t(`${entityName}.deleteSuccess`),
        error: t(`${entityName}.deleteError`),
      });
      setItems((prev) => prev.filter((i) => i.id !== itemIdToDelete));
    } catch (error) {
      console.error(error);
    } finally {
      setItemIdToDelete(null);
    }
  };

  /**
   * Guarda un item (crea o actualiza según el contexto)
   */
  const handleSave = async (item) => {
    const isEditing = Boolean(selectedItem);
    try {
      const savedItem = await toast.promise(
        isEditing ? updateItem(item) : createItem(item),
        {
          loading: isEditing ? t("common.updating") : t("common.creating"),
          success: isEditing
            ? t("common.updateSuccess")
            : t("common.createSuccess"),
          error: t("common.genericError"),
        }
      );

      setItems((prev) =>
        isEditing
          ? prev.map((i) => (i.id === savedItem.id ? savedItem : i))
          : [savedItem, ...prev]
      );

      setIsFormOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Cambia el ordenamiento de la tabla
   */
  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  /**
   * Cambia la cantidad de items por página
   */
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  /**
   * Navega hacia atrás
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  // ============================================
  // 🎨 RENDER
  // ============================================

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumb}>
        <button
          className={styles.breadcrumbButton}
          onClick={handleGoBack}
          aria-label={t("common.goBack")}
        >
          <FaArrowLeft />
          <span>{t("common.back")}</span>
        </button>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>
          {t(`${entityName}.title`)}
        </span>
      </nav>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          {entityIcon && <span className={styles.icon}>{entityIcon}</span>}
          {t(`${entityName}.title`)}
        </h2>

        <button className={styles.createButton} onClick={handleCreate}>
          <FaPlus /> {t(`${entityName}.createButton`)}
        </button>
      </div>

      {/* Contenido principal */}
      {isFormOpen ? (
        <CrudForm
          fields={fields}
          item={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
          validations={validations}
        />
      ) : (
        <>
          {!isLoading && (
            <div className={styles.controlsBar}>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <ItemsPerPageSelector
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}

          {isLoading ? (
            <Spinner size="large" message={t("common.loading")} />
          ) : (
            <CrudDataTable
              data={paginatedItems}
              fields={fields}
              onEdit={handleEdit}
              onDelete={handleDelete}
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
        </>
      )}

      {/* Modal de confirmación */}
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
