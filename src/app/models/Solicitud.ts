import { Pagination } from '../modulos/Pagination.model';

export class Solicitud extends Pagination{

    public iid_solicitud: number;
    public dbanda: number;
    public smotivos: string;
    public iestado: number;
    public tfechaInicio: Date;
    
}