import { Pagination } from "../modulos/Pagination.model";

export class AdelantoSueldo extends Pagination{

    public idAdelantoSueldo: number;
    public montoTotal: number;
    public nroCuotas: number;
    public fechaSol: Date;
    public tipo: number;
    public nombreArchivo: String;

    public accion: String;
    public estado: number;
}