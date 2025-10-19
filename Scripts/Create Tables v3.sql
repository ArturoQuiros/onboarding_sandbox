CREATE DATABASE DB_Onboarding

USE DB_Onboarding

-- Table: Paises
DROP TABLE IF EXISTS Paises
CREATE TABLE Paises (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(20) UNIQUE NOT NULL,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME
);

-- Table: Roles
DROP TABLE IF EXISTS Roles
CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(50) UNIQUE NOT NULL,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME
);

-- Table: Clientes
DROP TABLE IF EXISTS Clientes
CREATE TABLE Clientes (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(200) NOT NULL,
    Email VARCHAR(255) UNIQUE,
    Telefono VARCHAR(50),
    Direccion VARCHAR(255),
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME
);

-- Table: UsuariosInternos
DROP TABLE IF EXISTS UsuariosInternos
CREATE TABLE UsuariosInternos (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Azure_AD_User_Id VARCHAR(100),
    Puesto VARCHAR(100),
    Estado BIT,
    Id_Rol INT,
    Id_Pais INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_UsuariosInternos_Roles FOREIGN KEY (Id_Rol) REFERENCES Roles(Id),
    CONSTRAINT FK_UsuariosInternos_Paises FOREIGN KEY (Id_Pais) REFERENCES Paises(Id)
);

-- Table: UsuariosExternos
DROP TABLE IF EXISTS UsuariosExternos
CREATE TABLE UsuariosExternos (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Contrasena VARCHAR(255),
    Estado BIT,
    Id_Rol INT,
    Id_Cliente INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_UsuariosExternos_Roles FOREIGN KEY (Id_Rol) REFERENCES Roles(Id),
    CONSTRAINT FK_UsuariosExternos_Clientes FOREIGN KEY (Id_Cliente) REFERENCES Clientes(Id)
);

-- Table: Servicios
DROP TABLE IF EXISTS Servicios
CREATE TABLE Servicios (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(50) UNIQUE NOT NULL,
    Id_Pais INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_Servicios_Paises FOREIGN KEY (Id_Pais) REFERENCES Paises(Id)
);

-- Table: Contratos
DROP TABLE IF EXISTS Contratos
CREATE TABLE Contratos (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Id_Cliente INT,
    Id_Pais INT,
    Estado VARCHAR(20),
    Account_manager INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_Contratos_Paises FOREIGN KEY (Id_Pais) REFERENCES Paises(Id),
    CONSTRAINT FK_Contratos_Clientes FOREIGN KEY (Id_Cliente) REFERENCES Clientes(Id),
    CONSTRAINT FK_Contratos_UsuariosInternos FOREIGN KEY (Account_Manager) REFERENCES UsuariosInternos(Id)
);

-- Table: Contrato_Servicios (Join table)
DROP TABLE IF EXISTS Contrato_Servicios
CREATE TABLE Contrato_Servicios (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Id_Contrato INT,
    Id_Servicio INT,
    Estado BIT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME
    CONSTRAINT FK_Contrato_Servicios_Clientes FOREIGN KEY (Id_Contrato) REFERENCES Contratos(Id),
    CONSTRAINT FK_Contrato_Servicios_Servicios FOREIGN KEY (Id_Servicio) REFERENCES Servicios(Id)
);