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
import { IsDefined, IsString } from "class-validator";
export class experiencia {
    constructor(idUsuario, idSismo, fecha, tex_comentario, idDaño) {
        this.idUsuario = idUsuario;
        this.idSismo = idSismo;
        this.fecha = fecha;
        this.tex_comentario = tex_comentario;
        this.idDaño = idDaño;
    }
}
__decorate([
    Expose({ name: 'idUsuario' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro id es obligatorio` }; } }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw {
                status: 400,
                message: `Los datos id usuario no cumplen con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], experiencia.prototype, "idUsuario", void 0);
__decorate([
    Expose({ name: 'idSismo' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro id es obligatorio` }; } }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw {
                status: 400,
                message: `Los datos id sismo no cumplen con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], experiencia.prototype, "idSismo", void 0);
__decorate([
    Expose({ name: "fecha" }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro fecha es obligatorio` }; } }),
    IsString({ message: 'La fecha debe ser un string en formato "YYYY-MM-DD"' }),
    Transform(({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error('Formato de fecha inválido. Debe ser en formato "YYYY-MM-DD".');
        }
        return date.toISOString().slice(0, 10);
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], experiencia.prototype, "fecha", void 0);
__decorate([
    Expose({ name: 'tex_comentario' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro latitud es obligatorio` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @ ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El dato latitud incumple los parametros acordados" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], experiencia.prototype, "tex_comentario", void 0);
__decorate([
    Expose({ name: 'idDaño' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro id daño es obligatorio` }; } }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw {
                status: 400,
                message: `Los datos id daño no cumplen con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], experiencia.prototype, "idDa\u00F1o", void 0);
