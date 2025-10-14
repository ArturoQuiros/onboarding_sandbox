// src/Modules/Admin/pages/Users.jsx
import React, { useContext, useEffect, useMemo } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsPersonAdd } from "react-icons/bs";
import { useExternalUsersQuery } from "../hooks";

/**
 * Página de gestión de usuarios externos.
 * Usa CrudDashboard con React Query para operaciones CRUD.
 */
const Users = () => {
  const { setEntityIcon } = useContext(UIContext);

  const {
    externalUsersQuery,
    rolesQuery,
    customersQuery,
    createExternalUser,
    updateExternalUser,
    toggleExternalUserStatus,
  } = useExternalUsersQuery();

  // Establece el ícono en el sidebar
  useEffect(() => {
    setEntityIcon(<BsPersonAdd />);
  }, [setEntityIcon]);

  // ✅ Campos del formulario (memoizados)
  const userFields = useMemo(() => {
    const roles = rolesQuery.data ?? [];
    const customers = customersQuery.data ?? [];

    return [
      {
        key: "id",
        labelKey: "users.table.id",
        type: "text",
        isReadOnly: true,
        isHidden: true,
      },
      {
        key: "customerName",
        formKey: "id_Cliente",
        labelKey: "users.table.client",
        type: "select",
        options: customers.map((c) => ({
          value: c.id,
          label: c.name,
        })),
        validation: { required: true },
        isReadOnly: (item) => !!item, // Bloquear al editar
      },
      {
        key: "name",
        labelKey: "users.table.name",
        type: "text",
        validation: { required: true },
      },
      {
        key: "email",
        labelKey: "users.table.email",
        type: "email",
        validation: { required: true },
      },
      {
        key: "roleName",
        formKey: "id_Rol",
        labelKey: "users.table.role",
        type: "select",
        options: roles.map((r) => ({
          value: r.id,
          label: r.nombre || r.name,
        })),
        validation: { required: true },
      },
      {
        key: "password",
        labelKey: "users.table.password",
        type: "password",
        isTableVisible: false, // No mostrar en tabla
        validation: {
          required: (item) => !item, // Solo requerido al crear
        },
      },
    ];
  }, [rolesQuery.data, customersQuery.data]);

  // ✅ Validaciones
  const userValidations = useMemo(
    () => ({
      name: (value) => {
        if (!value) return "El nombre es obligatorio";
        if (value.length < 3) return "Debe tener al menos 3 caracteres";
        if (value.length > 100) return "No puede superar 100 caracteres";
        return null;
      },
      email: (value) => {
        if (!value) return "El correo es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value)) return "Formato de correo inválido";
        if (value.length > 255) return "No puede superar 255 caracteres";
        return null;
      },
      password: (value, formValues) => {
        // Solo validar si es un usuario nuevo (no tiene id)
        if (!formValues.id) {
          if (!value)
            return "La contraseña es obligatoria para nuevos usuarios";
          if (value.length < 8) return "Debe tener al menos 8 caracteres";
          if (value.length > 255) return "No puede superar 255 caracteres";
        }
        return null;
      },
      id_Cliente: (value) => {
        if (!value) return "Debe seleccionar un cliente";
        return null;
      },
      id_Rol: (value) => {
        if (!value) return "Debe seleccionar un rol";
        return null;
      },
    }),
    []
  );

  // ✅ Wrapper para el update (excluir password)
  const handleUpdate = useMemo(
    () => async (user) => {
      // El update NO incluye password, usar changePassword para eso
      return updateExternalUser.mutateAsync(user);
    },
    [updateExternalUser]
  );

  // ✅ Returns condicionales DESPUÉS de todos los hooks
  if (
    externalUsersQuery.isLoading ||
    rolesQuery.isLoading ||
    customersQuery.isLoading
  ) {
    return <div>Cargando usuarios...</div>;
  }

  if (
    externalUsersQuery.isError ||
    rolesQuery.isError ||
    customersQuery.isError
  ) {
    return (
      <div>
        Error cargando datos de usuarios
        {externalUsersQuery.error && <p>{externalUsersQuery.error.message}</p>}
        {rolesQuery.error && <p>{rolesQuery.error.message}</p>}
        {customersQuery.error && <p>{customersQuery.error.message}</p>}
      </div>
    );
  }

  return (
    <CrudDashboard
      entityName="users"
      fields={userFields}
      getItems={() => externalUsersQuery.data ?? []}
      createItem={createExternalUser.mutateAsync}
      updateItem={handleUpdate}
      deleteItem={(id) =>
        toggleExternalUserStatus.mutateAsync({ userId: id, newStatus: false })
      }
      validations={userValidations}
      initialFormValues={{
        name: "",
        email: "",
        password: "",
        id_Cliente: null,
        id_Rol: null,
      }}
    />
  );
};

export default Users;
