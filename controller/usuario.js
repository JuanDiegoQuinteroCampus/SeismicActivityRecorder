var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";
export class usuario {
    constructor(nombre, apellido, correo, /* fech_registro: string, */ telefono, idLocalizacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        /*     this.fech_registro = fech_registro; */
        this.telefono = telefono;
        this.idLocalizacion = idLocalizacion;
    }
}
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro nombre es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato latitud incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuario.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'apellido' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro apelllido es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s-,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato longitud incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuario.prototype, "apellido", void 0);
__decorate([
    Expose({ name: 'correo' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro correo es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato ciudad incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuario.prototype, "correo", void 0);
__decorate([
    Expose({ name: "telefono" }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro telefono es obligatorio` }; } }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw {
                status: 400,
                message: `Los datos id no cumplen con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuario.prototype, "telefono", void 0);
__decorate([
    Expose({ name: "idLocalizacion" }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro id es obligatorio` }; } }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw {
                status: 400,
                message: `Los datos id no cumplen con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuario.prototype, "idLocalizacion", void 0);
