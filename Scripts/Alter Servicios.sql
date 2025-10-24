SELECT name 
FROM sys.indexes 
WHERE object_id = OBJECT_ID('Servicios') AND is_unique = 1;

ALTER TABLE Servicios
DROP CONSTRAINT UQ__Servicio__75E3EFCF0FFF3728;