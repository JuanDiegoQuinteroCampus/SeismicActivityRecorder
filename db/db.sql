-- Active: 1737556944524@@127.0.0.1@3306@Seismic_Activity_Recorder
CREATE DATABASE Seismic_Activity_Recorder;

USE Seismic_Activity_Recorder;

CREATE TABLE
    sismo(
        idSismo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id VARCHAR(20) NOT NULL ,
        fecha DATE NOT NULL,
        hora_local TIME NOT NULL,
        magnitud NUMERIC NOT NULL,
        tipo_mag VARCHAR(20) NOT NULL,
        profundidad_km NUMERIC NOT NULL,
        intensidad_max INTEGER NOT NULL,
        area_epicentro VARCHAR(50) NOT NULL
    );

CREATE TABLE
    localizacion(
        idLocalizacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        latitud DECIMAL(9, 6),
        longitud DECIMAL(9, 6),
        ciudad VARCHAR(70) NOT NULL
    );

CREATE TABLE
    daño(
        idDaño INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idSismo INT NOT NULL,
        tipoDaño VARCHAR(40) NOT NULL,
        descripcion VARCHAR(120) NOT NULL,
        Foreign Key (idSismo) REFERENCES sismo(idSismo)
        
    );

CREATE TABLE
    usuario(
        idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(40) NOT NULL,
        apellido VARCHAR(40) NOT NULL,
        correo VARCHAR(20) NOT NULL,
        fech_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        telefono INT(15) NOT NULL,
        idLocalizacion INT NOT NULL,
        Foreign Key (idLocalizacion) REFERENCES localizacion(idLocalizacion)
    );


CREATE TABLE
    experiencia(
        idExperiencia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idUsuario INT NOT NULL,
        idSismo INT NOT NULL,
        fecha DATE NOT NULL,
        tex_comentario VARCHAR(120) NOT NULL,
        idDaño INT NOT NULL,
        Foreign Key (idUsuario) REFERENCES usuario(idUsuario),
        Foreign Key (idDaño) REFERENCES daño(idDaño),
        Foreign Key (idSismo) REFERENCES sismo(idSismo)

    );

    
-- DROP TABLE experiencia;
-- DROP TABLE usuario;
-- DROP TABLE daño;
-- DROP TABLE localizacion;
-- DROP TABLE sismo; 


---------Inserte Info----

INSERT INTO daño (idSismo, tipoDaño, descripcion)
VALUES
  (1, 'Estructural', 'Daño en edificio A'),
  (2, 'Vial', 'Daño en carretera principal'),
  (3, 'Inundación', 'Daño por inundación en área C');

INSERT INTO daño (idSismo, tipoDaño, descripcion)
VALUES
  (4, 'Incendio', 'Incendio en almacén'),
  (5, 'Deslizamiento', 'Deslizamiento de tierra en zona montañosa'),
  (6, 'Inundación', 'Inundación por lluvias intensas');
INSERT INTO daño (idSismo, tipoDaño, descripcion)
VALUES
  (7, 'Colapso', 'Colapso parcial de puente'),
  (8, 'Erosión', 'Erosión costera en playa turística'),
  (9, 'Avalancha', 'Avalancha en zona de montaña');



INSERT INTO localizacion (latitud, longitud, ciudad)
VALUES
  (12.345678, -98.765432, 'Ciudad A'),
  (23.456789, -87.654321, 'Ciudad B'),
  (34.567890, -76.543210, 'Ciudad C');

INSERT INTO localizacion (latitud, longitud, ciudad)
VALUES
  (45.678912, -56.789012, 'Ciudad D'),
  (56.789012, -67.890123, 'Ciudad E'),
  (67.890123, -78.901234, 'Ciudad F');
INSERT INTO localizacion (latitud, longitud, ciudad)
VALUES
  (78.901234, -89.012345, 'Ciudad G'),
  (89.012345, -90.123456, 'Ciudad H'),
  (90.123456, -91.234567, 'Ciudad I');
  

INSERT INTO usuario (nombre, apellido, correo, telefono, idLocalizacion)
VALUES
  ('Juan', 'Pérez', 'juan@example.com', 1234567890, 1),
  ('María', 'Gómez', 'maria@example.com', 987654320, 2),
  ('Pedro', 'López', 'pedro@example.com', 555555555, 3);

INSERT INTO usuario (nombre, apellido, correo, telefono, idLocalizacion)
VALUES
  ('Ana', 'Sánchez', 'ana@example.com', 11111111, 1),
  ('Carlos', 'González', 'carlos@example.com', 22222222, 2),
  ('Sofía', 'Martínez', 'sofia@example.com', 3333333, 3);

INSERT INTO usuario (nombre, apellido, correo, telefono, idLocalizacion)
VALUES
  ('Luis', 'Ramírez', 'luis@example.com', 44444444, 4),
  ('Marta', 'López', 'marta@example.com', 55555555, 5),
  ('Jorge', 'Hernández', 'jorge@example.com', 6666666, 6);


INSERT INTO experiencia (idUsuario, idSismo, fecha, tex_comentario, idDaño)
VALUES
  (1, 1, '2023-07-01', 'Excelente experiencia', 1),
  (2, 2, '2023-07-05', 'Muy impactante', 2),
  (3, 3, '2023-07-10', 'Ayuda humanitaria necesaria', 3);

INSERT INTO experiencia (idUsuario, idSismo, fecha, tex_comentario, idDaño)
VALUES
  (4, 4, '2023-07-15', 'Respuesta rápida de los equipos de emergencia', 4),
  (5, 5, '2023-07-20', 'Daño considerable en la infraestructura', 5),
  (6, 6, '2023-07-25', 'Comunidad afectada necesita apoyo', 6);

INSERT INTO experiencia (idUsuario, idSismo, fecha, tex_comentario, idDaño)
VALUES
  (7, 7, '2023-07-30', 'Evacuación de la población necesaria', 7),
  (8, 8, '2023-08-05', 'Importante daño en infraestructura turística', 8),
  (9, 9, '2023-08-10', 'Equipos de emergencia atendiendo la situación', 9);

-- los sql ya los agregue, ya estan los datos --