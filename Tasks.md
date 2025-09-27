# ✅ Tareas Pendientes para el Proyecto

Este es un resumen de las tareas de desarrollo (Frontend y Backend) y las correcciones/mejoras específicas para los módulos de la aplicación.

---

## 💻 Frontend (Interfaz de Usuario)

| Módulo                        | Tarea                                                                       | Notas                                                                                                                                                              |
| :---------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Personal (Usuarios Staff)** | 🔄 Reemplazar el botón "Crear" por **"Sincronizar AD"** o **"Actualizar"**. | El objetivo es resincronizar con el _Active Directory_ (AD) para actualizar la lista de usuarios. Evaluar si la función de "Crear" es necesaria o debe eliminarse. |
| **Clientes**                  | ❌ **Eliminar la validación estricta** del campo de **teléfono**.           | Los formatos de número telefónico pueden variar significativamente según el país.                                                                                  |
| **General**                   | 🔑 **Integrar JWT** (_JSON Web Tokens_).                                    | Implementar el manejo de tokens para la gestión de sesiones y autenticación.                                                                                       |
| **Servicios**                 | ⏳ **Esperar la actualización del API** de servicios.                       | Validar la funcionalidad de actualización una vez que el _backend_ esté corregido.                                                                                 |

---

## ⚙️ Backend (API y Lógica de Negocio)

| Módulo        | Tarea                                       | Notas                                                                                                                                 |
| :------------ | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| **General**   | 🌐 **Conectar al _Active Directory_ (AD)**. | Establecer la conexión y la lógica para la sincronización de usuarios.                                                                |
| **Servicios** | 🛠️ **Corregir la funcionalidad PUT**.       | Específicamente, revisar y corregir el _endpoint_ de actualización de servicios para que permita el **cambio de País** correctamente. |

---

## 🗃️ Bases de Datos / Estructura (Módulos Específicos)

### Usuarios / Staff

| Tarea                                                | Notas                                                                                                                                       |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| 🆕 **Crear una nueva tabla de Usuarios (Clientes)**. | La tabla existente de usuarios BDO debe ser renombrada a **"Staff"** o **"Personal"** para distinguirla claramente de los usuarios cliente. |

### Contratos

| Tarea                                                           | Notas                                  |
| :-------------------------------------------------------------- | :------------------------------------- |
| 🗑️ **Quitar el campo "Account Manager" de la Tabla Contratos**. | Simplificar la estructura de la tabla. |

| 🗑️ **Quitar el campo "numero de contrato" de la Tabla Contratos**. | El ID ya cumple esta funcion. |

| 🏷️ **Crear una tabla de Estados para Contratos**. | Debe incluir al menos los siguientes estados: **Pendiente**, **En Progreso**, y **Finalizado**. |
