import { Expose, Transform } from "class-transformer";
import {
  IsDefined,
} from "class-validator";

export class ubicacion {
    @Expose({ name: 'latitud' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro latitud es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato latitud incumple los parametros acordados"};},{ toClassOnly: true})
    latitud: string;

    @Expose({ name: 'longitud' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro longitud es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s-,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato longitud incumple los parametros acordados"};},{ toClassOnly: true})
  longitud: string;

  @Expose({ name: 'ciudad' })
  @IsDefined({message: ()=>{throw {status: 401, message: `El parametro ciudad es obligatorio` }}})
    @Transform(({value})=>{if(/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value)) return value; else throw {status: 400, message:"El dato ciudad incumple los parametros acordados"};},{ toClassOnly: true})
  ciudad: string;

  constructor(latitud: string, longitud: string, ciudad: string) {
    this.latitud = latitud;
    this.longitud = longitud;
    this.ciudad = ciudad;
  }
}
