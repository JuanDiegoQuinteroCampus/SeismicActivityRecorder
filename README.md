# Programming Backend Project

## Descripción

Este repositorio marca el inicio del proyecto backend, que tiene como objetivo desarrollar la parte central y funcional del sistema. Aquí se encontrarán todos los archivos y recursos relacionados con la lógica del negocio, bases de datos, API, servicios web, y cualquier otro componente necesario para el funcionamiento del proyecto.

## Objetivos

El proyecto backend tiene los siguientes objetivos principales:

- Diseñar y desarrollar una arquitectura robusta y escalable.
- Implementar la lógica del negocio y las funcionalidades requeridas.
- Establecer la comunicación con las bases de datos y el consumo de API.
- Consumir una API de sismos en tiempo real
- Modificar la API consumida para poder ver solo lo necesario.
- Dar opción al usuario para contarnos de su experiencia con el sismo.

El objetivo de este proyecto es por medio de la ayuda de una API de sismos en tiempo real consumirla y solo mostrar los caracteres esenciales mostrando datos de los sismos en tiempo real; además de darle la oportunidad a los usuarios de poder insertar sus experiencias como: si les afectó el temblor, que daños tubo, en que parte del mundo, ¿ha experimentado temblores antes?,  que sintió en el momento del temblor, que acciones toman al momento del sismo, ¿haz notado alguna diferencia a comparación del ultimo temblor?, etc. De esta manera tener un registro tanto de los sismos como de las experiencias de los usuarios de acuerdo a su ubicación

El nombre del proyecto es **"Seismic Activity Recorder"**


### Diagrama de entidad relación

<img src="img/DiagramaSismo.png">

### Instalaciones dependencias

Packed.json

`npm init -y`

Instalación Nodemon

`npm i -E -D nodemon`

Instalar Express

`npm i -E express`

Instalar dotenv

`npm i -E -D dotenv`

Instalar mysql2

`npm i -E -D mysql2`

Instalar nanoid

`npm i -E -D nanoid`

Instalar clase transformer

`npm i -E -D class-transformer`

Instalar reflect metadata

`npm i -E -D reflect-metadata`

Instalar typescript

`npm i -E -D typescript`

Instalar cookie-parser

`npm i -E -D cookie-parser`

Instalar class-validator

`npm i -E -D class-validator`

Instalación completa y rapida
`npm i -E -D nodemon express dotenv mysql2 nanoid cookie-parser class-transformer reflect-metadata class-validator typescript`



## Configuracion del .env

```
MY_CONFIG={"hostname": "", "port":}
MY_CONNECT={"host":"localhost","user":"","database":"","password":"","port":}
```



## Configuracion del tsconfig

```
{
    "compilerOptions":{
        "target":"es6",
        "module":"ES6",
        "moduleResolution":"node",
        "outDir":"./dtocontroller",
        "esModuleInterop":true,
        "experimentalDecorators":true,
        "emitDecoratorMetadata": true
    }
}
```



### DataBase Seismic_Activity_Recorder

Se creó la base de datos Seismic_Activity_Recorder con sus respectivas relaciones de acuerdo al diagrama entidad relación hecho anteriormente, la cual contiene las siguientes tablas:

- Sismo
- Usuario
- Daño
- Experiencia
- Localización

### Consumo Api de Sismos 

Se consumió una api de sismo para obtener los datos a insertar en la tabla sismo de la base de datos Seismic_Activity_Recorder, pero de la api solo se tomaron los siguientes datos de la tabla que son: idSismo

- *fecha*
- *hora_local*
- *magnitud*
- *tipo_mag*
- *profundidad_km*
- *intensidad_max*
- *area_epicentro*

La api seleccionada para el consumo e inserción de datos es: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson

###### Nueva columna, tabla sismo

Se insertó una nueva columna en la tabla sismo de la base de datos para poder insertar mejor el id del sismo por el motivo de que es tipo de dato varchar, y se le agregó la otra columna para utilizar un idSismo aparte y tenerlo con primary key para poder hacer las relaciones

### Router: Sismo

Se realizó la consulta get para poder obtener todos los datos acerca de los sismos
- http://localhost:5022/sismo/informacion 

Se le agregó un post para asi poder enviar o agregar datos a la tabla sismo

- http://localhost:5022/sismo/informacion/sent

Se le agregó otro post para asi poder enviar o agregar datos a la tabla sismo que sean diferentes a los de la api, o simplemente agregar un dato y no todos a la ves

- http://localhost:5022/sismo/informacion/sent/data

Se le agregó un put para que pudiera actualizar los datos por medio del id, asi seleccionando que datos quiere actualizar y volver a enviarlos

- http://localhost:5022/sismo/update/:idSismo

Se le agregó un delete con su id para poder eliminar únicamente la información unida a ese id 

- http://localhost:5022/sismo/informacion/eliminar/:idSismo

Se le agregó otro delete para borrar todos los datos de la tabla sismo

- http://localhost:5022/sismo/informacion/delete

##### DTO sismo

Se le aplicó el dto a la tabla sismo para que de este modo los datos que entren, entren de forma correcta, el post y put fueron donde se les llamo el proxySismo para validar los datos de entrada





### Router: Localización

Se realizó la consulta get para así poder obtener toda la data de la tabla localizacion

- http://localhost:5022/localizacion/lugar

Se realizó un post para asi poder enviar datos de localización del usuario

- http://localhost:5022/localizacion/lugar/sent

Se realizó un put para poder actualizar datos de la localizacion del usuario, poniendo el id en la url del dato que se quiere actualizar para asi luego enviarlo con los datos actualizados

- http://localhost:5022/localizacion/lugar/update/idLocalizacion

Se le agregó un delete para de esta forma eliminar los datos específicos que quiere con poner solo el id en la url

- http://localhost:5022/localizacion/lugar/del/:idLocalizacion



##### DTO Localizacion

Se le aplicó el dto a la tabla lozalizacion para que de este modo los datos que entren, entren de forma correcta, el post y put fueron donde se les llamo el proxyLocalizacion para validar los datos de entrada



### Router: Daño

Se realizó la consulta get para así poder obtener toda la data de la tabla daño

- http://localhost:5022/dano/obt

Se realizó un post para asi poder enviar datos de los daños

- http://localhost:5022/dano/clase/sent

Se realizó un put para poder actualizar datos los daños, poniendo el id en la url del dato que se quiere actualizar para asi luego enviarlo con los datos actualizados

- http://localhost:5022/dano/update/:idDano

Se le agregó un delete para de esta forma eliminar los datos específicos que quiere con poner solo el id en la url

- http://localhost:5022/dano/clase/del/:idDano

##### DTO Daño

Se le aplicó el dto a la tabla dañopara que de este modo los datos que entren, entren de forma correcta, el post y put fueron donde se les llamo el proxyDano para validar los datos de entrada



### Router: Usuario

Se realizó la consulta get para así poder obtener toda la data de la tabla usuario

- http://localhost:5022/user/info

Se realizó un post para asi poder enviar datos de los usuarios

- http://localhost:5022/user/sent

Se realizó un put para poder actualizar  los datos de usuarios, poniendo el id en la url del dato que se quiere actualizar para asi luego enviarlo con los datos actualizados

- http://localhost:5022/user/update/:idUsuario

Se le agregó un delete para de esta forma eliminar los datos específicos que quiere con poner solo el id en la url

- http://localhost:5022/user/del/:idUsuario

##### DTO Usuario

Se le aplicó el dto a la tabla Usuario para que de este modo los datos que entren, entren de forma correcta, el post y put fueron donde se les llamo el proxyUsuario para validar los datos de entrada

(No se le aplicó el dto a la fecha de registro ya que lo toma automáticamente del sistema, en si no se necesita validación)

### Router: Experiencia

Se realizó la consulta get para así poder obtener toda la data de la tabla experiencia

- http://localhost:5022/experiencia/info

Se realizó un post para asi poder enviar las experiencias de los usuarios

- http://localhost:5022/experiencia/sent

Se realizó un put para poder actualizar las experiencias de los usuarios, poniendo el id en la url del dato que se quiere actualizar para asi luego enviarlo con los datos actualizados

- http://localhost:5022/experiencia/update/:idExperiencia

Se le agregó un delete para de esta forma eliminar los datos específicos que quiere con poner solo el id en la url

- http://localhost:5022/experiencia/del/:idExperiencia



##### DTO Experiencia

Se le aplicó el dto a la tabla Experiencia para que de este modo los datos que entren, entren de forma correcta, el post y put fueron donde se les llamo el proxyExperiencia para validar los datos de entrada

