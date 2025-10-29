CREATE TABLE Estados_Tarea (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME
);

EXEC sp_rename 'Estados_Tarea', 'Estados_Tarea_Old';

CREATE TABLE Estados_Tarea (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    Fecha_Creacion DATETIME,
    Fecha_Modificacion DATETIME
);

INSERT INTO Estados_Tarea (Id, Nombre, Fecha_Creacion, Fecha_Modificacion)
SELECT Id, Nombre, Fecha_Creacion, Fecha_Modificacion FROM Estados_Tarea_Old; 

SELECT 
    fk.name AS ForeignKeyName,
    OBJECT_NAME(fk.parent_object_id) AS TablaHija,
    c.name AS ColumnaHija
FROM sys.foreign_keys fk
JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
JOIN sys.columns c ON fkc.parent_object_id = c.object_id AND fkc.parent_column_id = c.column_id
WHERE fk.referenced_object_id = OBJECT_ID('Estados_Tarea_Old');

ALTER TABLE Tarea_Contrato
DROP CONSTRAINT FK_TareaContrato_Estado;

DROP TABLE Estados_Tarea_Old;

ALTER TABLE Tarea_Contrato
ADD CONSTRAINT FK_TareaContrato_Estado
FOREIGN KEY (Id_Estado) REFERENCES Estados_Tarea(Id);