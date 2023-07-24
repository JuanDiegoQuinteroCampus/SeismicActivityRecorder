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
import { IsDefined, } from "class-validator";
export class dano {
    constructor(idSismo, tipoDaño, descripcion) {
        this.idSismo = idSismo;
        this.tipoDaño = tipoDaño;
        this.descripcion = descripcion;
    }
}
__decorate([
    Expose({ name: "idSismo" }),
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
], dano.prototype, "idSismo", void 0);
__decorate([
    Expose({ name: 'tipoDaño' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro tipodaño es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s-,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato longitud incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], dano.prototype, "tipoDa\u00F1o", void 0);
__decorate([
    Expose({ name: 'descripcion' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro descripcion es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato ciudad incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], dano.prototype, "descripcion", void 0);
