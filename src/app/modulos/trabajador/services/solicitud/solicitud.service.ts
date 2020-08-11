import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';


@Injectable()
export class SolicitudService {

  constructor(public http: HttpClient) { }
  listarSolicitudxEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/listarPorEmpresa',empresa)
  }
  listarSolicitudxSupervisor(trabajador) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/listarPorSupervisor',trabajador)
  }
  cancelarSolicitud(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cancelarSolicitud',solicitudDto)    
  }
  eliminarSolicitud(solicitud){
    const url = URL_SERVICIOSBACK + 'solicitud/' + solicitud.iidSolicitud;
    return this.http.delete(url,solicitud)
  }
  cambiarEstado(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstado',solicitudDto)    
  }
  cambiarEstadoRevision(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstadoRevision',solicitudDto)    
  }
  cambiarEstadoAprobado(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstadoAprobar',solicitudDto)    
  }
  cambiarEstadoRechazado(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstadoRechazar',solicitudDto)    
  }
  
}
