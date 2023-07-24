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
import { IsDefined, IsString, IsNumberString, IsIn, IsInt, } from "class-validator";
export class sismo {
    constructor(id, fecha, hora_local, magnitud, tipo_mag, profundidad_km, intensidad_max, area_epicentro) {
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
__decorate([
    Expose({ name: "id" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro id es necesario y obligatorio`,
            };
        },
    }),
    Transform(({ value }) => {
        if (/^[a-z 0-9]+$/.test(value))
            return value;
        else
            throw {
                status: 400,
                message: `Los datos nombre no cumplen con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], sismo.prototype, "id", void 0);
__decorate([
    Expose({ name: "fecha" }),
    IsString({ message: 'La fecha debe ser un string en formato "YYYY-MM-DD"' }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro fecha es necesario y obligatorio`,
            };
        },
    }),
    Transform(({ value }) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error('Formato de fecha inválido. Debe ser en formato "YYYY-MM-DD".');
        }
        return date.toISOString().slice(0, 10);
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], sismo.prototype, "fecha", void 0);
__decorate([
    Expose({ name: "hora_local" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro hora_local es necesario y obligatorio`,
            };
        },
    }),
    IsString({
        message: 'La hora_local debe ser un string en formato "HH:mm:ss"',
    }),
    Transform(({ value }) => {
        return value;
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], sismo.prototype, "hora_local", void 0);
__decorate([
    Expose({ name: "magnitud" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro magnitud es necesario y obligatorio`,
            };
        },
    }),
    IsNumberString({}, { message: "La magnitud debe ser una cadena numérica" }),
    __metadata("design:type", String)
], sismo.prototype, "magnitud", void 0);
__decorate([
    Expose({ name: "tipo_mag" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro tipo_mag es necesario y obligatorio`,
            };
        },
    }),
    IsString({ message: "El tipo_mag debe ser un string" }),
    IsIn(["mb", "mw", "ml", "ms", "mwc", "mwb", "mwr", "mww", "mlv", "mlr"], {
        message: "El tipo_mag debe ser uno de los valores permitidos: mb, mw, ml, ms, mwc, mwb, mwr, mww, mlv, mlr",
    }),
    Transform(({ value }) => value, { toClassOnly: true }),
    __metadata("design:type", String)
], sismo.prototype, "tipo_mag", void 0);
__decorate([
    Expose({ name: "profundidad_km" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro profundidad_km es necesario y obligatorio`,
            };
        },
    }),
    IsNumberString({}, { message: "La profundidad_km debe ser una cadena numérica" }),
    __metadata("design:type", String)
], sismo.prototype, "profundidad_km", void 0);
__decorate([
    Expose({ name: "intensidad_max" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro intensidad_max es necesario y obligatorio`,
            };
        },
    }),
    IsInt({ message: "La intensidad_max debe ser una cadena numérica" }),
    __metadata("design:type", Number)
], sismo.prototype, "intensidad_max", void 0);
__decorate([
    Expose({ name: "area_epicentro" }),
    IsDefined({
        message: () => {
            throw {
                status: 401,
                message: `Este parametro area_epicentro es necesario y obligatorio`,
            };
        },
    }),
    IsString({ message: "El area_epicentro debe ser un string" }),
    Transform(({ value }) => value, { toClassOnly: true }),
    __metadata("design:type", String)
], sismo.prototype, "area_epicentro", void 0);
