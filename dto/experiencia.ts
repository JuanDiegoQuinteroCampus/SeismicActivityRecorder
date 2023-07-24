import { Expose, Transform } from "class-transformer";
import {
  IsDefined,IsString
} from "class-validator";

export class experiencia {
    @Expose({ name: 'idUsuario' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro id es obligatorio`}}})
  @Transform(
    ({ value }) => {
      if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
      else
        throw {
          status: 400,
          message: `Los datos id usuario no cumplen con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  idUsuario: number;

    @Expose({ name: 'idSismo' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro id es obligatorio`}}})
  @Transform(
    ({ value }) => {
      if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
      else
        throw {
          status: 400,
          message: `Los datos id sismo no cumplen con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  idSismo: number;

  @Expose({ name: "fecha" })
  @IsDefined({message: ()=>{throw {status: 401, message: `El parametro fecha es obligatorio` }}})
    @IsString({ message: 'La fecha debe ser un string en formato "YYYY-MM-DD"' })
    @Transform(
      ({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          throw new Error(
            'Formato de fecha inválido. Debe ser en formato "YYYY-MM-DD".'
          );
        }
        return date.toISOString().slice(0, 10);
      },
      { toClassOnly: true }
    )
    fecha: string; 

  @Expose({ name: 'tex_comentario' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro latitud es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato latitud incumple los parametros acordados"};},{ toClassOnly: true})
    tex_comentario: string;

    @Expose({ name: 'idDaño' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro id daño es obligatorio`}}})
  @Transform(
    ({ value }) => {
      if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
      else
        throw {
          status: 400,
          message: `Los datos id daño no cumplen con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  idDaño: number;

 

  constructor(idUsuario: number, idSismo: number, fecha: string, tex_comentario: string, idDaño: number) {
    this.idUsuario = idUsuario;
    this.idSismo = idSismo;
    this.fecha = fecha;
    this.tex_comentario = tex_comentario;
    this.idDaño = idDaño;
  }
}
