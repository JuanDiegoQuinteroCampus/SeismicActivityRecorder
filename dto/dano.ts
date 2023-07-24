import { Expose, Transform } from "class-transformer";
import {
  IsDefined,
} from "class-validator";

export class dano {
    @Expose({ name: "idSismo" })
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
  idSismo: number;



    @Expose({ name: 'tipoDaño' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipodaño es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s-,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato longitud incumple los parametros acordados"};},{ toClassOnly: true})
    tipoDaño: string;

  @Expose({ name: 'descripcion' })
  @IsDefined({message: ()=>{throw {status: 401, message: `El parametro descripcion es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato ciudad incumple los parametros acordados"};},{ toClassOnly: true})
    descripcion: string;

  constructor(idSismo: number, tipoDaño: string, descripcion: string) {
    this.idSismo = idSismo;
    this.tipoDaño = tipoDaño;
    this.descripcion = descripcion;
  }
}
