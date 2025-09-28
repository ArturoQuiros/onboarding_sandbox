CREATE DATABASE DB_Onboarding

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

-- Table: Usuarios
DROP TABLE IF EXISTS Usuarios
CREATE TABLE Usuarios (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(100) NOT NULL,
    Azure_AD_User_Id VARCHAR(100) UNIQUE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Id_Pais INT,
    Role_Id INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_Usuarios_Paises FOREIGN KEY (Id_Pais) REFERENCES Paises(Id),
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (Role_Id) REFERENCES Roles(Id)
);

-- Table: Servicios
DROP TABLE IF EXISTS Servicios
CREATE TABLE Servicios (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(50) UNIQUE NOT NULL,
    Id_pais INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_Servicios_Paises FOREIGN KEY (Id_Pais) REFERENCES Paises(Id)
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

-- Table: Contratos
DROP TABLE IF EXISTS Contratos
CREATE TABLE Contratos (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Id_Cliente INT,
    Estado VARCHAR(20),
    Account_manager INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_Contratos_Clientes FOREIGN KEY (Id_Cliente) REFERENCES Clientes(Id),
    CONSTRAINT FK_Contratos_Usuarios FOREIGN KEY (Account_Manager) REFERENCES Usuarios(Id)
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