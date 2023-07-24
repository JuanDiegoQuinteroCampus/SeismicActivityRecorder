import express from "express";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { usuario } from "../controller/usuario.js";
import { validate } from "class-validator";

const proxyUsuario = express();

proxyUsuario.use(async (req, res, next) => {
  try {
    const data = plainToClass(usuario, req.body, { excludeExtraneousValues: true });
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      const errors = validationErrors.map((err) => Object.values(err.constraints));
      res.status(400).json({ message: "Validation error", errors });
    } else {
      req.body = JSON.parse(JSON.stringify(data));
      next();
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default proxyUsuario;
