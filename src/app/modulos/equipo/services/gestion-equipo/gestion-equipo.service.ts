import { Injectable } from '@angular/core';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class GestionEquipoService {

  constructor(public http: HttpClient) { }

  listarPuestoAreaEmp(empresa) {
    return this.http.post (URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarPuesto', empresa);
  }

  registrarSolicitud(solicitudDto) {
    return this.http.post (URL_SERVICIOSBACK + 'solicitud/registrar', solicitudDto);
  }
}
