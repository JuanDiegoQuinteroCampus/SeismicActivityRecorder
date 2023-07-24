import express from "express";
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { dano } from "../controller/dano.js";
import { validate } from "class-validator";

const proxyDano = express();

proxyDano.use(async (req, res, next) => {
  try {
    const data = plainToClass(dano, req.body, { excludeExtraneousValues: true });
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

export default proxyDano;
