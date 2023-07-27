import mysql from "mysql2";
import { Router } from "express";
import proxyUsuario from "../middleware/proxyUsuario.js";
import { validateToken } from "../middleware/proxyJWT.js";

const storageUsuario = Router();
let con = undefined;

storageUsuario.use((req, res, next) =>{
    let myConfig = JSON.parse(process.env.MY_CONNECT)
    con = mysql.createPool(myConfig);
    next();
});

storageUsuario.get('/info', validateToken,(req, res)=>{
    con.query(
        `SELECT * FROM usuario`,
        (err,data,fil) => {
            res.send(JSON.stringify(data));
        }
    )
});

storageUsuario.post('/sent',validateToken, proxyUsuario,(req, res)=>{
    
    const {
        nombre, apellido, correo, telefono, idLocalizacion
    } = req.body;
    
    const sql =`
    INSERT INTO usuario (nombre, apellido, correo, telefono, idLocalizacion)
    VALUES (?, ?, ?,?,?)
    `;

    const values = [
        nombre, apellido, correo, telefono, idLocalizacion
    ];
    
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al insertar los datos del usuario:", err);
            return res.status(500).json({ error: "Error interno del servidor."})
        }
        res.status(201).json({ mensaje: "datos del usuario insertados con éxito." });
    });
});

storageUsuario.put('/update/:idUsuario',validateToken, proxyUsuario, (req, res) => {
    const idUsuario = req.params.idUsuario;
    const newData = req.body; 
  
    con.query(
      'UPDATE usuario SET ? WHERE idUsuario = ?',
      [newData, idUsuario],
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


  storageUsuario.delete('/del/:idUsuario', validateToken,(req, res)=>{
    const idUsuario = req.params.idUsuario;
    con.query(
        `DELETE FROM usuario WHERE idUsuario = ?`,
        idUsuario,

        (err, result) => {
            if (err) {
                console.error('Error al eliminar los datos de usuarios', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

export default storageUsuario;