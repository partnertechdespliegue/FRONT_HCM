import { TipoDoc } from './TipoDoc';
import { NivelEdu } from './niveledu';
import { Ocupacion } from './ocupacion';

export class Postulante{
    // idFalta?: number;
    // fecha: Date;
    // justificado: number;
    id_postulante: Number;
    nombres: String;
    ape_paterno: String;
    ape_materno: String;
    fecha_nacimiento: Date;
    tipoDoc: TipoDoc=new TipoDoc();
    nro_documento: Number;
    telefono: Number;
    correo: String;
    tiempo_experiencia: Number;
    unidad_tiempo: String;
    pretension: Number;
    nivelEdu: NivelEdu=new NivelEdu();
    ocupacion: Ocupacion=new Ocupacion();
    comentarios: String;
    estado: Number;

}