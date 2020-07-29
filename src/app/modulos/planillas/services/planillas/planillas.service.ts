import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { Trabajador } from '../../../../models/Trabajador';


@Injectable()
export class PlanillasService {

  constructor(public http: HttpClient) {
  }

  listarTrabajador(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'trabajador/porEmpresa',empresa)
  }

  generarPlanilla(planilla_final){
    return this.http.post(URL_SERVICIOSBACK + 'planilla/generarPlanilla',planilla_final)
  }

  obtenerTipoTardanza(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'parametro/obtenerTipoTard',empresa);
  }

  obtenerTipoRango(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'parametro/obtenerTipoTardRango',empresa)

  }

  encontrarPlanilla(planilla_final){
    return this.http.post(URL_SERVICIOSBACK + 'planilla/buscarPlanilla',planilla_final)
  }

  listarBoletas(trabajador){
    return this.http.post(URL_SERVICIOSBACK + 'planilla/listarBoletas',trabajador)
  }

  listarPHDsctRemu(planillaHistorico){
    return this.http.post(URL_SERVICIOSBACK + 'planilla/listarPHDsctRemu',planillaHistorico)
  }

  eliminarPlanilla(planilla){
    return this.http.delete(URL_SERVICIOSBACK + 'planilla/'+planilla.idPlanillaHistorico);
  }

  reportes(obj) {
    return this.http.post(URL_SERVICIOSBACK + "reporte/pdf", obj,{responseType: "arraybuffer"})
  }

  listarTrabajadorPorComprobante(empresa,tipoComp){
    return this.http.post(URL_SERVICIOSBACK + 'trabajador/porEmpresayTipoComprobante/'+tipoComp,empresa);
  }

  subirArchivo(archivo:File, idTtrab:number){
    let formData = new FormData();
    formData.append("file", archivo);
    return this.http.post(URL_SERVICIOSBACK+"suspencion/subirArchivo/"+idTtrab,formData);
  }

  listarUlt(trab){
    return this.http.post(URL_SERVICIOSBACK+'rhe/listarUltimos',trab);
  }

  eliminarRHE(idtrab){
    return this.http.delete(URL_SERVICIOSBACK+"rhe/"+idtrab);
  }

  registrarRHE(archivo:File, idTrab,idpdoAno,idpdoMes){
    let formData = new FormData();
    formData.append("file", archivo);
    return this.http.post(URL_SERVICIOSBACK+"rhe/registrar/"+idTrab+"/"+idpdoAno+"/"+idpdoMes,formData);
  }

  listarRHEs(planDTO){
    return this.http.post(URL_SERVICIOSBACK+"rhe/listarRHEs",planDTO);
  }

  descargarRHE(rhe){
    return this.http.get(URL_SERVICIOSBACK+"rhe/descargar/"+rhe, {
      responseType: "arraybuffer"
      });
  }

  registarSolicitud(adeSueDTO){
    return this.http.post(URL_SERVICIOSBACK+"adelantoSueldo/registrarSolicitud",adeSueDTO);
  }

  listarAdeSue(trabajador){
    return this.http.post(URL_SERVICIOSBACK+"adelantoSueldo/listarAdeSueldo",trabajador);
  }

  listarCuotas(adeSue){
    return this.http.post(URL_SERVICIOSBACK+"adelantoSueldo/listarCuotas",adeSue);
  }

  listarDeuda(trabajador){
    return this.http.post(URL_SERVICIOSBACK+"adelantoSueldo/listarDeuda",trabajador);
  }

  subirArchivoAdelantoSueldo(archivo:File, idAdeSue:number){
    let formData = new FormData();
    formData.append("file", archivo);
    return this.http.post(URL_SERVICIOSBACK+"adelantoSueldo/subirArchivo/"+idAdeSue,formData);
  }

  listarCuentaCargo(empresa){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/listar",empresa);
  }

  generarTxtGeneral(cuentaCargoDTO){
    return this.http.post(URL_SERVICIOSBACK+"generarTxt/general",cuentaCargoDTO)
  }

  descargarTxtGeneral(txt){
    return this.http.get(URL_SERVICIOSBACK+"generarTxt/descargar/"+txt, {
      responseType: "arraybuffer"
      });
  }

  generarTxtPersonal(cuentaCargoDTO){
    return this.http.post(URL_SERVICIOSBACK+"generarTxt/personal",cuentaCargoDTO)
  }

}
