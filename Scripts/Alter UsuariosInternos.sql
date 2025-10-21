DROP TABLE IF EXISTS UsuariosInternos
CREATE TABLE UsuariosInternos (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(255),
    Azure_AD_User_Id VARCHAR(100) UNIQUE NOT NULL,
    Puesto VARCHAR(100),
    Estado BIT,
    Id_Rol INT,
    Id_Pais INT,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME,
    CONSTRAINT FK_UsuariosInternos_Roles FOREIGN KEY (Id_Rol) REFERENCES Roles(Id),
    CONSTRAINT FK_UsuariosInternos_Paises FOREIGN KEY (Id_Pais) REFERENCES Paises(Id)
);