import mysql from "mysql2";
import { Router } from "express";
import proxyLocalizacion from "../middleware/proxyLocalizacion.js";

const storageLocalizacion = Router();
let con = undefined;

storageLocalizacion.use((req, res, next) =>{
    let myConfig = JSON.parse(process.env.MY_CONNECT)
    con = mysql.createPool(myConfig);
    next();
});

storageLocalizacion.get('/lugar', (req, res)=>{
    con.query(
        `SELECT * FROM localizacion`,
        (err,data,fil) => {
            res.send(JSON.stringify(data));
        }
    )
});

storageLocalizacion.post('/lugar/sent', proxyLocalizacion, (req, res)=>{
    
    const {
        latitud,
        longitud,
        ciudad
    } = req.body;
    
    const sql =`
    INSERT INTO localizacion (latitud, longitud, ciudad)
    VALUES (?, ?, ?)
    `;

    const values = [
        latitud,
        longitud,
        ciudad,
    ];
    
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al insertar la la localidad:", err);
            return res.status(500).json({ error: "Error interno del servidor."})
        }
        res.status(201).json({ mensaje: "Localidad insertada con éxito." });
    });
});

storageLocalizacion.put('/lugar/update/:idLocalizacion', proxyLocalizacion, (req, res) => {
    const idLocalizacion = req.params.idLocalizacion;
    const newData = req.body; 
  
    con.query(
      'UPDATE localizacion SET ? WHERE idLocalizacion = ?',
      [newData, idLocalizacion],
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


storageLocalizacion.delete('/lugar/del/:idLocalizacion', (req, res)=>{
    const idLocalizacion = req.params.idLocalizacion;
    con.query(
        `DELETE FROM localizacion WHERE idLocalizacion = ?`,
        idLocalizacion,

        (err, result) => {
            if (err) {
                console.error('Error al eliminar la localidad del usuario', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

export default storageLocalizacion;