import { Pagination } from '../modulos/Pagination.model';

export class Eps extends Pagination{
    public idEps: number;
    public descripcion: String;
    public aporte: number;
    public accion: String;
    public estado: number;
}