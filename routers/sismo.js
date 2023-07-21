import mysql from "mysql2";
import { Router } from "express";
import sismosInfo from '../api/sismoApi.js';

const storageSismo = Router();

let con = undefined;

storageSismo.use((req, res, next) =>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig);
    next();
});

storageSismo.get('/informacion', (req, res)=>{
    con.query(
        `SELECT * FROM sismo `,
        (err, data, fil) => {
            res.send(JSON.stringify(data));
        }
    );
});

storageSismo.post('/informacion', (req, res)=>{
    sismosInfo.forEach((sismo) => {
        const sqlQuery = `INSERT INTO sismo (id, fecha, hora_local, magnitud, tipo_mag, profundidad_km, intensidad_max, area_epicentro) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [sismo.idSismo, sismo.fecha, sismo.hora_local, sismo.magnitud, sismo.tipo_mag, sismo.profundidad_km, sismo.intensidad_max, sismo.area_epicentro];
    
        con.query(sqlQuery, values, (error, result) => {
          if (error) {
            console.error('Error al insertar datos en la base de datos:', error);
          } else {
            console.log('Datos insertados correctamente:', result);
          }
        });
    });
    res.send("Datos insertados correctamente en la base de datos.");
});

export default storageSismo;
