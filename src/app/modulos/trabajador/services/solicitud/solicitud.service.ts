import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';


@Injectable()
export class SolicitudService {

  constructor(public http: HttpClient) { }
  listarSolicitudxEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/listarPorEmpresa',empresa)
  }
  /* listarSolicitudxSupervisor(trabajador) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/listarPorSupervisor',trabajador)
  } */
}
