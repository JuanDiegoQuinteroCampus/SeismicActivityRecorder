import mysql from "mysql2";
import { Router } from "express";
import proxyDano from "../middleware/proxyDano.js";
import { validateToken } from "../middleware/proxyJWT.js";

const storageDaño = Router();
let con = undefined;

storageDaño.use((req, res, next) =>{
    let myConfig = JSON.parse(process.env.MY_CONNECT)
    con = mysql.createPool(myConfig);
    next();
});

storageDaño.get('/obt', validateToken,(req, res)=>{
    con.query(
        `SELECT * FROM daño`,
        (err,data,fil) => {
            res.send(JSON.stringify(data));
        }
    )
});

storageDaño.post('/clase/sent',validateToken,proxyDano, (req, res)=>{
    
    const {
        idSismo, tipoDaño, descripcion
    } = req.body;
    
    const sql =`
    INSERT INTO daño (idSismo, tipoDaño, descripcion)
    VALUES (?, ?, ?)
    `;

    const values = [
        idSismo, tipoDaño, descripcion,
    ];
    
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al insertar los daños:", err);
            return res.status(500).json({ error: "Error interno del servidor."})
        }
        res.status(201).json({ mensaje: "Daños insertados con éxito." });
    });
});

storageDaño.put('/clase/update/:idDano',validateToken,  proxyDano,(req, res) => {
    const idDaño = req.params.idDano;
    const newData = req.body; 
  
    con.query(
      'UPDATE daño SET ? WHERE idDaño = ?',
      [newData, idDaño],
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


  storageDaño.delete('/clase/del/:idDano',validateToken, (req, res)=>{
    const idDano = req.params.idDano;
    con.query(
        `DELETE FROM daño WHERE idDaño = ?`,
        idDano,

        (err, result) => {
            if (err) {
                console.error('Error al eliminar los daños causados', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

export default storageDaño;