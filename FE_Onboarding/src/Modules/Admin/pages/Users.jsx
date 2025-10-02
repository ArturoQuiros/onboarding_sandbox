// src/Modules/Admin/pages/Users.jsx
import React, { useContext, useEffect, useState } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsPersonAdd } from "react-icons/bs";

/**
 * Página de gestión de usuarios.
 * Usa CrudDashboard con operaciones CRUD simuladas y validaciones.
 */
const Users = () => {
  const { setEntityIcon } = useContext(UIContext);

  // Estado de usuarios y siguiente ID para crear nuevos
  const [users, setUsers] = useState([
    {
      id: 1,
      client: "Cliente A",
      email: "user1@clienteA.com",
      password: "password123",
    },
    {
      id: 2,
      client: "Cliente B",
      email: "user2@clienteB.com",
      password: "password456",
    },
    {
      id: 3,
      client: "Cliente A",
      email: "user3@clienteA.com",
      password: "password789",
    },
  ]);
  const [nextId, setNextId] = useState(4);

  // Establece el ícono para esta página
  useEffect(() => {
    setEntityIcon(<BsPersonAdd />);
  }, [setEntityIcon]);

  // --- Operaciones CRUD Simuladas ---
  const getUsers = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return users.map(({ id, client, email }) => ({ id, client, email }));
  };

  const createUser = async (user) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = {
      id: nextId,
      client: user.client,
      email: user.email,
      password: user.password || "default-password",
    };
    setUsers((prev) => [...prev, newUser]);
    setNextId((prev) => prev + 1);
    return { id: newUser.id, client: newUser.client, email: newUser.email };
  };

  const updateUser = async (user) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let updatedUser = {};
    setUsers((prev) => {
      const index = prev.findIndex((u) => u.id === user.id);
      if (index === -1)
        throw new Error("Usuario no encontrado para actualizar");
      const existing = prev[index];
      updatedUser = {
        ...existing,
        client: user.client,
        email: user.email,
        password: user.password?.length > 0 ? user.password : existing.password,
      };
      const newUsers = [...prev];
      newUsers[index] = updatedUser;
      return newUsers;
    });
    return {
      id: updatedUser.id,
      client: updatedUser.client,
      email: updatedUser.email,
    };
  };

  const deleteUser = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUsers((prev) => prev.filter((u) => u.id !== id));
    return true;
  };

  // --- Campos para CrudForm ---
  const userFields = [
    {
      key: "id",
      labelKey: "users.table.id",
      type: "text",
      isReadOnly: true,
      isHidden: true,
    },
    { key: "client", labelKey: "users.table.client", type: "text" },
    { key: "email", labelKey: "users.table.email", type: "email" },
    {
      key: "password",
      labelKey: "users.table.password",
      type: "password",
      isTableVisible: false,
    },
  ];

  // --- Validaciones ---
  const userValidations = {
    client: (value) => {
      if (!value) return "El Cliente es obligatorio";
      if (value.length < 3) return "Debe tener al menos 3 caracteres";
      return null;
    },
    email: (value) => {
      if (!value) return "El correo es obligatorio";
      if (!/\S+@\S+\.\S+/.test(value)) return "Formato de correo inválido";
      return null;
    },
    password: (value, formValues) => {
      if (!formValues.id && !value)
        return "La contraseña es obligatoria para nuevos usuarios";
      if (value && value.length < 6) return "Debe tener al menos 6 caracteres";
      return null;
    },
  };

  return (
    <CrudDashboard
      entityName="users"
      fields={userFields}
      getItems={getUsers}
      createItem={createUser}
      updateItem={updateUser}
      deleteItem={deleteUser}
      validations={userValidations}
      initialFormValues={{ client: "", email: "", password: "" }}
    />
  );
};

export default Users;
