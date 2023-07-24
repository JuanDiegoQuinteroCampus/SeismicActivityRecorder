import { Expose, Transform } from "class-transformer";
import {
  IsDefined,
  IsString
} from "class-validator";

export class usuario {
    @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato latitud incumple los parametros acordados"};},{ toClassOnly: true})
    nombre: string;

    @Expose({ name: 'apellido' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro apelllido es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s-,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato longitud incumple los parametros acordados"};},{ toClassOnly: true})
    apellido: string;

  @Expose({ name: 'correo' })
  @IsDefined({message: ()=>{throw {status: 401, message: `El parametro correo es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato ciudad incumple los parametros acordados"};},{ toClassOnly: true})
    correo: string;

   /*  @Expose({ name: "fech_registro" })
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
    fech_registro: string; */



    @Expose({ name: "telefono" })
  @IsDefined({message: ()=>{throw {status: 401, message: `El parametro telefono es obligatorio`}}})
  @Transform(
    ({ value }) => {
      if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
      else
        throw {
          status: 400,
          message: `Los datos id no cumplen con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  telefono:number

  @Expose({ name: "idLocalizacion" })
  @IsDefined({message: ()=>{throw {status: 401, message: `El parametro id es obligatorio`}}})
  @Transform(
    ({ value }) => {
      if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
      else
        throw {
          status: 400,
          message: `Los datos id no cumplen con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  idLocalizacion:number

  constructor(nombre: string, apellido: string,correo: string,/* fech_registro: string, */ telefono: number, idLocalizacion: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
/*     this.fech_registro = fech_registro; */
    this.telefono = telefono;
    this.idLocalizacion = idLocalizacion;
  }
}
