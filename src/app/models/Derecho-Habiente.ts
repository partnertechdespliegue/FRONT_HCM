import { Pagination } from "../modulos/Pagination.model";

export class DerechoHabiente extends Pagination{

    public idDerechoHabiente: number;
    public idTipoDerechoHabiente: number;
    public nombreArchivo: String;
    public nombre: String;
    public apellido: String;
    public fechaNac: Date;
    public correo: String;
    public nroCuspp: String;

    public fechaInicio:Date;
    public fechaFin:Date;

    public accion: String;
    public estado: number;
}