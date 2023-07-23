import dotenv from 'dotenv';
import express from 'express';
/* import sismo from './api/sismoApi.js'; */
import storageSismo from './routers/sismo.js';
import storageLocalizacion from './routers/localizacion.js';
import storageDaño from './routers/daño.js';


dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/sismo", storageSismo);
appExpress.use("/localizacion", storageLocalizacion)
appExpress.use("/dano", storageDaño)


const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{console.log(`http://${config.hostname}:${config.port}`);});