ALTER TABLE Usuarios
ALTER COLUMN [Azure_AD_User_Id] varchar(100) NULL;

ALTER TABLE Usuarios
DROP CONSTRAINT UQ__Usuarios__CA4E090B69F8A854;

ALTER TABLE Usuarios
ADD Tipo int; -- Interno=1 Externo=2 