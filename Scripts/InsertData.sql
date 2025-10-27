-- Insertar datos en la tabla Paises
INSERT INTO Paises (Nombre, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Costa Rica', GETDATE(), GETDATE()),
('México', GETDATE(), GETDATE()),
('Colombia', GETDATE(), GETDATE());

-- Insertar datos en la tabla Roles
INSERT INTO Roles (Nombre, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Admin', GETDATE(), GETDATE()),
('Manager', GETDATE(), GETDATE()),
('User', GETDATE(), GETDATE());
-- Insertar datos en la tabla Usuarios
-- (Id_Pais y Role_Id se refieren a los IDs de las tablas Paises y Roles)
INSERT INTO Usuarios (Nombre, Azure_AD_User_Id, Email, Id_Pais, Role_Id, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Ana Pérez', 'ana.perez@example.com', 'ana.perez@bdo.com', 1, 1, GETDATE(), GETDATE()),
('Luis Gómez', 'luis.gomez@example.com', 'luis.gomez@bdo.com', 2, 2, GETDATE(), GETDATE()),
('Sofía Vargas', 'sofia.vargas@example.com', 'sofia.vargas@bdo.com', 3, 3, GETDATE(), GETDATE()),
('Ana García', NULL, 'ana.garcia.admin@dominio.com', 'hash_admin_A1', 1, 1, 1, 1, GETDATE(), GETDATE()),
('Roberto Martínez', 'azure_robert_m456', 'roberto.martinez.admin@dominio.com', 'hash_admin_B2', 1, 1, 1, 1, GETDATE(), GETDATE()),
('Laura Pérez', NULL, 'laura.perez.admin@dominio.com', 'hash_admin_C3', 1, 1, 1, 1, GETDATE(), GETDATE()),
('Carlos Sánchez', 'azure_carlos_s789', 'carlos.sanchez.admin@dominio.com', 'hash_admin_D4', 1, 1, 1, 1, GETDATE(), GETDATE()),
('Sofía Torres', NULL, 'sofia.torres.admin@dominio.com', 'hash_admin_E5', 1, 1, 1, 1, GETDATE(), GETDATE());

-- Insertar datos en la tabla Servicios
-- (Id_pais se refiere al ID de la tabla Paises)
INSERT INTO Servicios (Nombre, Id_pais, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Consultoría de Negocios', 1, GETDATE(), GETDATE()),
('Auditoría Financiera', 1, GETDATE(), GETDATE()),
('Asesoría Fiscal (Impuestos)', 1, GETDATE(), GETDATE()),
('Gestión de Riesgos', 1, GETDATE(), GETDATE()),
('Servicios de Cumplimiento (Compliance)', 1, GETDATE(), GETDATE()),
('Ciberseguridad y Privacidad', 1, GETDATE(), GETDATE()),
('Outsourcing Contable y Nómina', 1, GETDATE(), GETDATE()),
('Valoración de Empresas', 1, GETDATE(), GETDATE()),
('Fusiones y Adquisiciones (M&A)', 1, GETDATE(), GETDATE()),
('Servicios Legales Corporativos', 1, GETDATE(), GETDATE()),
('Consultoría de Negocios', 2, GETDATE(), GETDATE()),
('Auditoría Financiera', 2, GETDATE(), GETDATE()),
('Asesoría Fiscal (Impuestos)', 2, GETDATE(), GETDATE()),
('Gestión de Riesgos', 2, GETDATE(), GETDATE()),
('Servicios de Cumplimiento (Compliance)', 2, GETDATE(), GETDATE()),
('Ciberseguridad y Privacidad', 2, GETDATE(), GETDATE()),
('Outsourcing Contable y Nómina', 2, GETDATE(), GETDATE()),
('Valoración de Empresas', 2, GETDATE(), GETDATE()),
('Fusiones y Adquisiciones (M&A)', 2, GETDATE(), GETDATE()),
('Servicios Legales Corporativos', 2, GETDATE(), GETDATE()),
('Consultoría de Negocios', 3, GETDATE(), GETDATE()),
('Auditoría Financiera', 3, GETDATE(), GETDATE()),
('Asesoría Fiscal (Impuestos)', 3, GETDATE(), GETDATE()),
('Gestión de Riesgos', 3, GETDATE(), GETDATE()),
('Servicios de Cumplimiento (Compliance)', 3, GETDATE(), GETDATE()),
('Ciberseguridad y Privacidad', 3, GETDATE(), GETDATE()),
('Outsourcing Contable y Nómina', 3, GETDATE(), GETDATE()),
('Valoración de Empresas', 3, GETDATE(), GETDATE()),
('Fusiones y Adquisiciones (M&A)', 3, GETDATE(), GETDATE()),
('Servicios Legales Corporativos', 3, GETDATE(), GETDATE());

-- Insertar datos en la tabla Clientes
INSERT INTO Clientes (Nombre, Email, Telefono, Direccion, Fecha_Creacion, Fecha_Modificacion)
VALUES
('Soluciones Globales S.A.', 'contacto@solucionesglobales.com', '555-123-4567', 'Avenida Central 101', GETDATE(), GETDATE()),
('Innovación Digital Ltda.', 'info@innovaciondigital.net', '555-987-6543', 'Calle del Sol 202', GETDATE(), GETDATE()),
('Corporación Comercial C.R.', 'admin@corporacioncr.com', '555-555-5555', 'Boulevard Principal 303', GETDATE(), GETDATE()),
('Tecnología Avanzada del Sur', 'ventas@tecavanzada.com', '555-222-3333', 'Paseo de la Montaña 404', GETDATE(), GETDATE()),
('Fábrica Textil La Costa', 'gerencia@textilacosta.com', '555-444-5555', 'Zona Industrial 505', GETDATE(), GETDATE()),
('Agencia de Viajes Mundo Feliz', 'reservas@mundofeliz.net', '555-666-7777', 'Plaza Mayor 606', GETDATE(), GETDATE()),
('Distribuidora El Éxito', 'compras@distribuidoraexito.com', '555-888-9999', 'Carretera Vieja 707', GETDATE(), GETDATE()),
('Constructora Del Valle', 'contacto@constructoradelvalle.com', '555-101-1010', 'Urbanización Nueva 808', GETDATE(), GETDATE()),
('Servicios Médicos Integrales', 'info@medicosintegrales.com', '555-202-2020', 'Torre de Salud 909', GETDATE(), GETDATE()),
('Exportadora Fénix', 'logistica@exportadorafenix.com', '555-303-3030', 'Puerto Comercial 110', GETDATE(), GETDATE());

-- Insertar datos en la tabla Contratos
-- (Id_Cliente y Account_Manager se refieren a los IDs de las tablas Clientes y Usuarios)
INSERT INTO Contratos (Id_Cliente, Numero_contrato, Estado, Account_Manager, Fecha_Creacion, Fecha_Modificacion)
VALUES
(1, 'Activo', 1, GETDATE(), GETDATE()),
(2, 'Activo', 2, GETDATE(), GETDATE()),
(3, 'Pendiente', 3, GETDATE(), GETDATE());

-- Insertar datos en la tabla Contrato_Servicios
-- (Id_Contrato e Id_Servicio se refieren a los IDs de las tablas Contratos y Servicios)
INSERT INTO Contrato_Servicios (Id_Contrato, Id_Servicio)
VALUES
(1, 1, 0), -- El contrato 1 tiene el servicio 1
(1, 2, 0), -- El contrato 1 también tiene el servicio 2
(2, 2, 0), -- El contrato 2 tiene el servicio 2
(3, 3, 0); -- El contrato 3 tiene el servicio 3