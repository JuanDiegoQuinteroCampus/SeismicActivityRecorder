import mysql from "mysql2";
import { Router } from "express";
import sismosInfo from '../api/sismoApi.js';
import proxySismo from "../middleware/proxySismo.js";

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

storageSismo.post('/informacion/sent', proxySismo , (req, res)=>{
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


storageSismo.post('/informacion/sent/data', proxySismo , (req, res)=>{
  
  const{id, fecha, hora_local, magnitud, tipo_mag, profundidad_km, intensidad_max, area_epicentro} = req.body;

      const sql = `INSERT INTO sismo (id, fecha, hora_local, magnitud, tipo_mag, profundidad_km, intensidad_max, area_epicentro) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [id, fecha, hora_local, magnitud, tipo_mag, profundidad_km, intensidad_max, area_epicentro];
  
      con.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error al insertar la data:", err);
          return res.status(500).json({ error: "Error interno del servidor." });
        }
    
        res.status(201).json({ mensaje: "datos de sismo insertada con éxito." });
      });
    });
/* 
Dato para probar despues validaciones
{
    
    "id": "us7000kfa9",
    "fecha": "1899-11-30T04:56:16.000Z",
    "hora_local": "08:58:47",
    "magnitud": "d",
    "tipo_mag": "mb",
    "profundidad_km": "10",
    "intensidad_max": 333,
    "area_epicentro": "Colombia"
  } */

storageSismo.put('/update/:idSismo', proxySismo,(req, res) => {
  const idSismo = req.params.idSismo;
  const newData = req.body; 

  con.query(
    'UPDATE sismo SET ? WHERE idSismo = ?',
    [newData, idSismo],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).send('Error al actualizar el registro');
      } else {
        console.log('Registro actualizado:', result.affectedRows, 'filas afectadas');
        res.status(200).send('Registro actualizado exitosamente');
      }
    }
  );
});



storageSismo.delete('/informacion/eliminar/:idSismo', (req, res)=>{
    const idSismo = req.params.idSismo;
    con.query(
        `DELETE FROM sismo 
        WHERE idSismo = ?`,
        idSismo,
        
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el dato del sismo', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

storageSismo.delete('/informacion/delete', (req, res) => {
    con.query(
      `DELETE FROM sismo`,
      (err, result) => {
        if (err) {
          console.error('Error al eliminar todos los datos de la tabla de sismos:', err);
          res.status(500).send('Error al eliminar todos los datos de la tabla de sismos.');
        } else {
          console.log('Todos los datos de la tabla de sismos han sido eliminados:', result);
          res.send('Todos los datos de la tabla de sismos han sido eliminados.');
        }
      }
    );
  });
  
export default storageSismo;
