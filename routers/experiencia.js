import mysql from "mysql2";
import { Router } from "express";
import proxyExperiencia from "../middleware/proxyExperiencia.js";
import { validateToken } from "../middleware/proxyJWT.js";

const storageExperiencia = Router();
let con = undefined;

storageExperiencia.use((req, res, next) =>{
    let myConfig = JSON.parse(process.env.MY_CONNECT)
    con = mysql.createPool(myConfig);
    next();
});

storageExperiencia.get('/info',validateToken, (req, res)=>{
    con.query(
        `SELECT * FROM experiencia`,
        (err,data,fil) => {
            res.send(JSON.stringify(data));
        }
    )
});

storageExperiencia.post('/sent',validateToken, proxyExperiencia,(req, res)=>{
    
    const {
        idUsuario, idSismo, fecha, tex_comentario, idDaño
    } = req.body;
    
    const sql =`
    INSERT INTO experiencia (idUsuario, idSismo, fecha, tex_comentario, idDaño)
    VALUES (?, ?, ?,?,?)
    `;

    const values = [
        idUsuario, idSismo, fecha, tex_comentario, idDaño
    ];
    
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al insertar las experiencias de los usuarios:", err);
            return res.status(500).json({ error: "Error interno del servidor."})
        }
        res.status(201).json({ mensaje: "experiencias de los usuarios insertadas" });
    });
});

storageExperiencia.put('/update/:idExperiencia', validateToken,proxyExperiencia, (req, res) => {
    const idExperiencia = req.params.idExperiencia;
    const newData = req.body; 
  
    con.query(
      'UPDATE experiencia SET ? WHERE idExperiencia = ?',
      [newData, idExperiencia],
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


  storageExperiencia.delete('/del/:idExperiencia',validateToken, (req, res)=>{
    const idExperiencia = req.params.idExperiencia;
    con.query(
        `DELETE FROM experiencia WHERE idExperiencia = ?`,
        idExperiencia,

        (err, result) => {
            if (err) {
                console.error('Error al eliminar las experiencais de los usuarios', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

export default storageExperiencia;