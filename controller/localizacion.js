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
export class ubicacion {
    constructor(latitud, longitud, ciudad) {
        this.latitud = latitud;
        this.longitud = longitud;
        this.ciudad = ciudad;
    }
}
__decorate([
    Expose({ name: 'latitud' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro latitud es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato latitud incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], ubicacion.prototype, "latitud", void 0);
__decorate([
    Expose({ name: 'longitud' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro longitud es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s-,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato longitud incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], ubicacion.prototype, "longitud", void 0);
__decorate([
    Expose({ name: 'ciudad' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro ciudad es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato ciudad incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], ubicacion.prototype, "ciudad", void 0);
