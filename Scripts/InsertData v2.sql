USE DB_Onboarding;
GO

-- ==========================================
-- INSERTS DE DATOS BASE
-- ==========================================

-- Tabla: Paises
INSERT INTO Paises (Nombre, Fecha_Creacion)
VALUES 
('Costa Rica', GETDATE()),
('México', GETDATE()),
('Panamá', GETDATE());
GO

-- Tabla: Roles
INSERT INTO Roles (Nombre, Fecha_Creacion)
VALUES
('Administrador', GETDATE()),
('Account Manager', GETDATE()),
('Cliente', GETDATE());
GO

-- Tabla: Clientes
INSERT INTO Clientes (Nombre, Email, Telefono, Direccion, Fecha_Creacion)
VALUES
('ACME S.A.', 'contacto@acme.com', '+50622223333', 'San José, Costa Rica', GETDATE()),
('TechCorp Ltd.', 'info@techcorp.mx', '+525511223344', 'Ciudad de México, México', GETDATE()),
('Innovatech Panamá', 'ventas@innovatech.pa', '+5073456789', 'Ciudad de Panamá, Panamá', GETDATE());
GO

-- Tabla: UsuariosExternos
INSERT INTO UsuariosExternos (Nombre, Email, Contrasena, Estado, Id_Rol, Id_Cliente, Fecha_Creacion)
VALUES
('Juan Pérez', 'juan.perez@acme.com', '1234hash', 1, 3, 1, GETDATE()),
('María Gómez', 'maria.gomez@techcorp.mx', '5678hash', 1, 3, 2, GETDATE()),
('Carlos Ruiz', 'carlos.ruiz@innovatech.pa', '9012hash', 0, 3, 3, GETDATE());
GO

-- Tabla: Servicios
INSERT INTO Servicios (Nombre, Id_Pais, Fecha_Creacion)
VALUES
('Onboarding Legal', 1, GETDATE()),
('Cumplimiento Fiscal', 1, GETDATE()),
('Registro de Empresa', 2, GETDATE()),
('Gestión de Nómina', 3, GETDATE());
GO

-- Tabla: Contratos
INSERT INTO Contratos (Id_Cliente, Id_Pais, Estado, Account_Manager, Fecha_Creacion)
VALUES
(1, 1, 'Activo', 1, GETDATE()),
(2, 2, 'En revisión', 1, GETDATE()),
(3, 3, 'Activo', 1, GETDATE());
GO

-- Tabla: Contrato_Servicios
INSERT INTO Contrato_Servicios (Id_Contrato, Id_Servicio, Estado, Fecha_Creacion)
VALUES
(1, 1, 1, GETDATE()),
(1, 2, 1, GETDATE()),
(2, 3, 1, GETDATE()),
(3, 4, 0, GETDATE());
GO

-- Tabla: Tareas
INSERT INTO Tareas (Id_Servicio, Nombre, Descripcion, EsInterno, Fecha_Creacion)
VALUES
(1, 'Revisión de documentos legales', '{"fields": ["cedula", "constitutiva", "permiso"]}', 1, GETDATE()),
(2, 'Configuración fiscal inicial', '{"fields": ["régimen", "actividad", "impuestos"]}', 1, GETDATE()),
(3, 'Registro ante Hacienda', '{"fields": ["RFC", "actividad", "domicilio"]}', 0, GETDATE()),
(4, 'Carga de planilla inicial', '{"fields": ["colaboradores", "salarios", "beneficios"]}', 0, GETDATE());
GO

-- Tabla: Estados_Tarea
INSERT INTO Estados_Tarea (Nombre, Fecha_Creacion)
VALUES
('Pendiente', GETDATE()),
('En Proceso', GETDATE()),
('Completada', GETDATE()),
('En Revisión', GETDATE());
GO

-- Tabla: Tarea_Contrato
INSERT INTO Tarea_Contrato (Id_Contrato, Id_Tarea, Id_UsuarioResponsable, Id_Estado, Json_Respuesta, Observaciones)
VALUES
(1, 1, 1, 2, '{"status":"50%","comentario":"Faltan documentos"}', 'Pendiente entrega cliente'),
(1, 2, 1, 1, NULL, 'Tarea asignada recientemente'),
(2, 3, 1, 3, '{"RFC":"ABC1234567","actividad":"Servicios"}', 'Completado correctamente'),
(3, 4, 1, 1, NULL, 'Esperando carga inicial');
GO
