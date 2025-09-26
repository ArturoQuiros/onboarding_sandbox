-- Insertar datos en la tabla Paises
INSERT INTO Paises (Nombre, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Costa Rica', GETDATE(), GETDATE()),
('México', GETDATE(), GETDATE()),
('Colombia', GETDATE(), GETDATE());

-- Insertar datos en la tabla Roles
INSERT INTO Roles (Nombre, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Manager', GETDATE(), GETDATE()),
('Auditor', GETDATE(), GETDATE()),
('Staff', GETDATE(), GETDATE());

-- Insertar datos en la tabla Usuarios
-- (Id_Pais y Role_Id se refieren a los IDs de las tablas Paises y Roles)
INSERT INTO Usuarios (Nombre, Azure_AD_User_Id, Email, Id_Pais, Role_Id, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Ana Pérez', 'ana.perez@example.com', 'ana.perez@bdo.com', 1, 1, GETDATE(), GETDATE()),
('Luis Gómez', 'luis.gomez@example.com', 'luis.gomez@bdo.com', 2, 2, GETDATE(), GETDATE()),
('Sofía Vargas', 'sofia.vargas@example.com', 'sofia.vargas@bdo.com', 3, 3, GETDATE(), GETDATE());

-- Insertar datos en la tabla Servicios
-- (Id_pais se refiere al ID de la tabla Paises)
INSERT INTO Servicios (Nombre, Id_pais, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Consultoría de Negocios', 1, GETDATE(), GETDATE()),
('Auditoría Financiera', 2, GETDATE(), GETDATE()),
('Asesoría Fiscal', 3, GETDATE(), GETDATE());

-- Insertar datos en la tabla Clientes
INSERT INTO Clientes (Nombre, Email, Telefono, Direccion, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Soluciones Globales S.A.', 'contacto@solucionesglobales.com', '555-123-4567', 'Avenida Central 101', GETDATE(), GETDATE()),
('Innovación Digital Ltda.', 'info@innovaciondigital.net', '555-987-6543', 'Calle del Sol 202', GETDATE(), GETDATE()),
('Corporación Comercial C.R.', 'admin@corporacioncr.com', '555-555-5555', 'Boulevard Principal 303', GETDATE(), GETDATE());

-- Insertar datos en la tabla Contratos
-- (Id_Cliente y Account_Manager se refieren a los IDs de las tablas Clientes y Usuarios)
INSERT INTO Contratos (Id_Cliente, Numero_contrato, Estado, Account_Manager, Fecha_Creacion, Fecha_Modificacion)
VALUES
(1, 'BDO-001-CR', 'Activo', 1, GETDATE(), GETDATE()),
(2, 'BDO-002-MX', 'Activo', 2, GETDATE(), GETDATE()),
(3, 'BDO-003-CO', 'Pendiente', 3, GETDATE(), GETDATE());

-- Insertar datos en la tabla Contrato_Servicios
-- (Id_Contrato e Id_Servicio se refieren a los IDs de las tablas Contratos y Servicios)
INSERT INTO Contrato_Servicios (Id_Contrato, Id_Servicio)
VALUES
(1, 1), -- El contrato 1 tiene el servicio 1
(1, 2), -- El contrato 1 también tiene el servicio 2
(2, 2), -- El contrato 2 tiene el servicio 2
(3, 3); -- El contrato 3 tiene el servicio 3