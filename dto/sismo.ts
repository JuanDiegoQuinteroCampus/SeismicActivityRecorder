import { Expose, Transform } from "class-transformer";
import {
  IsDefined,
  IsString,
  IsNumberString,
  IsIn,
  IsInt,
} from "class-validator";

export class sismo {


  @Expose({ name: "id" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro id es necesario y obligatorio`,
      };
    },
  })
  @Transform(
    ({ value }) => {
      if (/^[a-z 0-9]+$/.test(value)) return value;
      else
        throw {
          status: 400,
          message: `Los datos nombre no cumplen con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  id: string;

  @Expose({ name: "fecha" })
  @IsString({ message: 'La fecha debe ser un string en formato "YYYY-MM-DD"' })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro fecha es necesario y obligatorio`,
      };
    },
  })
  fecha: string;

  @Expose({ name: "hora_local" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro hora_local es necesario y obligatorio`,
      };
    },
  })
  @IsString({
    message: 'La hora_local debe ser un string en formato "HH:mm:ss"',
  })
  @Transform(
    ({ value }) => {
      return value;
    },
    { toClassOnly: true }
  )
  hora_local: string;

  @Expose({ name: "magnitud" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro magnitud es necesario y obligatorio`,
      };
    },
  })
  @IsNumberString({}, { message: "La magnitud debe ser una cadena numérica" })
  magnitud: string;

  @Expose({ name: "tipo_mag" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro tipo_mag es necesario y obligatorio`,
      };
    },
  })
  @IsString({ message: "El tipo_mag debe ser un string" })
  @IsIn(["mb", "mw", "ml", "ms", "mwc", "mwb", "mwr", "mww", "mlv", "mlr"], {
    message:
      "El tipo_mag debe ser uno de los valores permitidos: mb, mw, ml, ms, mwc, mwb, mwr, mww, mlv, mlr",
  })
  @Transform(({ value }) => value, { toClassOnly: true })
  tipo_mag: string;

  @Expose({ name: "profundidad_km" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro profundidad_km es necesario y obligatorio`,
      };
    },
  })
  @IsNumberString({}, { message: "La profundidad_km debe ser una cadena numérica" })
  profundidad_km: string;

  @Expose({ name: "intensidad_max" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro intensidad_max es necesario y obligatorio`,
      };
    },
  })
  @IsInt( { message: "La intensidad_max debe ser una cadena numérica" })
  intensidad_max: number;

  @Expose({ name: "area_epicentro" })
  @IsDefined({
    message: () => {
      throw {
        status: 401,
        message: `Este parametro area_epicentro es necesario y obligatorio`,
      };
    },
  })
  @IsString({ message: "El area_epicentro debe ser un string" })
  @Transform(({ value }) => value, { toClassOnly: true })
  area_epicentro: string;

  constructor(
    id: string,
    fecha: string,
    hora_local: string,
    magnitud: string,
    tipo_mag: string,
    profundidad_km: string,
    intensidad_max: number,
    area_epicentro: string
  ) {

    this.id = id;
    this.fecha = fecha;
    this.hora_local = hora_local;
    this.magnitud = magnitud;
    this.tipo_mag = tipo_mag;
    this.profundidad_km = profundidad_km;
    this.intensidad_max = intensidad_max;
    this.area_epicentro = area_epicentro;
  }
  
}
