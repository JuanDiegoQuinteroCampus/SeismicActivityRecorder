import express from 'express';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

dotenv.config();
let appJWT = express();

appJWT.use(express.json());

appJWT.get('/:id', async(req,res)=>{
    let usuario = {
        id: req.params.id
    }
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({usuario});
    const jwt = await jwtconstructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("3600s")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    res.send({jwt});
});

export default appJWT;
