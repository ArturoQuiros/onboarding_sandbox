ALTER TABLE Tarea_Contrato
ALTER COLUMN Id_UsuarioResponsable INT NULL;

ALTER TABLE Tarea_Contrato
ADD CONSTRAINT DF_TareaContrato_Id_Estado DEFAULT 1 FOR Id_Estado;

Alter Table Tarea_Contrato
Add Estado BIT