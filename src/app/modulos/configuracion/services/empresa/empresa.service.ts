import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class EmpresaService {

  constructor(public http: HttpClient) {
  }

  registrarEmpresa(empresa) {
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'empresa/registrar',empresa);
    return res;
  }

  actualizarEmpresa(empresa){
    var res:any;
    res=this.http.put(URL_SERVICIOSBACK + 'empresa/modificar',empresa);
    return res;
  }

  eliminarEmpresa(empresa){
    var res:any;
    res=this.http.delete(URL_SERVICIOSBACK + 'empresa/'+empresa.idEmpresa);
    return res;
  }

  listarEmpresa(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'empresa/listar')
    return res;
  }

  // listarTipoEmpresa(){
  //   return this.http.get(URL_SERVICIOSBACK + 'tipoEmpresa/listar');
  // }

  listarRegTributario(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'regimenTributario/listar')
    return res;
  }

  listarEncargadoPlan(empresa){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/listar",empresa);
  }

  listarEncargadoPlanInac(empresa){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/listarInac",empresa);
  }

  registrarEncargadoPlan(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/registrar",empresaDTO);
  }

  darBaja(encarPlan){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/darBaja",encarPlan)
  }

  activar(encarPlan){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/activar",encarPlan)
  }

  registrarCuentaCargo(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/registrar",empresaDTO);
  }

  modificarCuentaCargo(cuentaCargo){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/modificar",cuentaCargo)
  }

  eliminarCuentaCargo(idCuentaCargo){
    return this.http.delete(URL_SERVICIOSBACK+"cuentaCargo/"+idCuentaCargo);
  }

  listarCuentaCargo(empresa){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/listar",empresa)
  }

  listarBanco(){
    return this.http.get(URL_SERVICIOSBACK+"banco/listar")
  }

  subirLogo(archivo: File, id) {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(URL_SERVICIOSBACK + "empresa/subirLogo", formData);
  }
}
