import React, { useContext, useEffect, useState } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { FaUsers } from "react-icons/fa"; // Usaremos un ícono de usuarios
import { BsPersonAdd } from "react-icons/bs";
// import axiosClient from "../../../Api/axiosClient"; // No se usa por el momento

// Datos de usuarios hardcodeados para simular el API
// NOTA: En una aplicación real, NUNCA debes almacenar contraseñas de esta forma.
const initialUsers = [
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
];

export const Users = () => {
  const { setEntityIcon, entityIcon } = useContext(UIContext);
  const [users, setUsers] = useState(initialUsers);
  const [nextId, setNextId] = useState(
    initialUsers.length > 0 ? Math.max(...initialUsers.map((u) => u.id)) + 1 : 1
  );

  useEffect(() => {
    // Establecer el ícono para este dashboard
    setEntityIcon(<BsPersonAdd />);
  }, [setEntityIcon]);

  // --- Operaciones CRUD Simuladas ---

  // Trae los usuarios (excluyendo la contraseña para la visualización en la tabla)
  const getUsers = async () => {
    // Retraso simulado de la red
    await new Promise((resolve) => setTimeout(resolve, 500));
    // La clave aquí es que el objeto retornado NO tiene la propiedad 'password'.
    // Esto hace que la columna no tenga valor y, combinada con isTableVisible: false, la esconde.
    return users.map((user) => ({
      id: user.id,
      client: user.client,
      email: user.email,
    }));
  };

  // Crea un nuevo usuario
  const createUser = async (user) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser = {
      id: nextId,
      client: user.client,
      email: user.email,
      password: user.password || "default-password", // Se requiere una contraseña
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNextId((prevId) => prevId + 1);

    // Retornamos el objeto para la tabla (sin la contraseña)
    return { id: newUser.id, client: newUser.client, email: newUser.email };
  };

  // Actualiza un usuario
  const updateUser = async (user) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let updatedUser = {};
    setUsers((prevUsers) => {
      const index = prevUsers.findIndex((u) => u.id === user.id);
      if (index === -1) {
        throw new Error("Usuario no encontrado para actualizar");
      }

      const existingUser = prevUsers[index];
      updatedUser = {
        ...existingUser,
        client: user.client,
        email: user.email,
        // Solo actualiza la contraseña si se proporciona una nueva y no está vacía
        password:
          user.password && user.password.length > 0
            ? user.password
            : existingUser.password,
      };

      const newUsers = [...prevUsers];
      newUsers[index] = updatedUser;
      return newUsers;
    });

    // Retornamos el objeto actualizado para la tabla (sin la contraseña)
    return {
      id: updatedUser.id,
      client: updatedUser.client,
      email: updatedUser.email,
    };
  };

  // Elimina un usuario
  const deleteUser = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    return true;
  };

  // --- Definición de Campos ---
  const userFields = [
    {
      key: "id",
      labelKey: "users.table.id",
      type: "text",
      isReadOnly: true,
      isHidden: true,
    }, // ID oculto
    { key: "client", labelKey: "users.table.client", type: "text" },
    { key: "email", labelKey: "users.table.email", type: "email" },
    // **CLAVE:** Este campo aparece en los formularios.
    // **isTableVisible: false** asegura que no se renderice una columna en la tabla.
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
    // Validación de contraseña: Obligatoria para CREAR, Opcional para EDITAR.
    password: (value, formValues) => {
      // Si estamos creando (no hay 'id'), la contraseña es obligatoria.
      if (!formValues.id && !value) {
        return "La contraseña es obligatoria para nuevos usuarios";
      }
      // Si se ingresa un valor (ya sea en crear o editar), debe tener al menos 6 caracteres
      if (value && value.length < 6) {
        return "Debe tener al menos 6 caracteres";
      }
      return null;
    },
  };

  return (
    <CrudDashboard
      entityName="users" // Clave de traducción
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
