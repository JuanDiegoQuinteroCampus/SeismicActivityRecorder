CREATE DATABASE Seismic_Activity_Recorder;

USE Seismic_Activity_Recorder;

CREATE TABLE
    sismo(
        idSismo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        fecha DATE NOT NULL,
        hora_local TIME NOT NULL,
        magnitud VARCHAR(20) NOT NULL,
        tipo_mag VARCHAR(20) NOT NULL,
        profundidad_km INT(20) NOT NULL,
        intensidad_max VARCHAR(20) NOT NULL,
        area_epicentro VARCHAR(50) NOT NULL
    );

CREATE TABLE
    usuario(
        idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(40) NOT NULL,
        apellido VARCHAR(40) NOT NULL,
        correo VARCHAR(20) NOT NULL,
        fech_registro DATE DEFAULT CURRENT_DATE,
        telefono INT(15) NOT NULL,
        idLocalizacion INT NOT NULL,
        Foreign Key (idLocalizacion) REFERENCES localizacion(idLocalizacion)
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
CREATE TABLE
    localizacion(
        idLocalizacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        latitud DECIMAL(9, 6),
        longitud DECIMAL(9, 6),
        ciudad VARCHAR(70) NOT NULL
    );
    

DROP TABLE localizacion;
DROP TABLE experiencia;
DROP TABLE daño;
DROP TABLE usuario;
DROP TABLE sismo;