import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Empresa } from '../../../../models/Empresa';
import { Trabajador } from '../../../../models/Trabajador';
import Constantes from '../../../../models/Constantes';
import { ConfirmarEliminarSolicitudComponent } from './modals/confirmar-eliminar-solicitud/confirmar-eliminar-solicitud.component';
import { VisualizarSolicitudEmpresaComponent } from './modals/visualizar-solicitud-empresa/visualizar-solicitud-empresa.component';



@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public solicitudService: SolicitudService 
  ) { }
  
  modalRef: NgbModalRef;
  public empresa: Empresa = new Empresa();
  public trabajador: any = new Trabajador();
  infoToken: any;
  
  lsSolicitudxEmpresa: any [] = [];
  lsSolicitudxSupervisor: any [] = [];

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.trabajador = JSON.parse(localStorage.getItem('InfoToken')).trabajador;
    this.listarSolicitudxEmpresa();
    this.listarSolicitudxSupervisor();
    //this.token = JSON.parse(localStorage.getItem('InfoToken'));
    this.infoToken = JSON.parse(localStorage.getItem("InfoToken"));
  }

  listarSolicitudxEmpresa() { 
    this.solicitudService.listarSolicitudxEmpresa(this.empresa).subscribe((resp: any) => {
      this.lsSolicitudxEmpresa = resp.aaData;
    })
  }

  listarSolicitudxSupervisor() { 
    this.solicitudService.listarSolicitudxSupervisor(this.trabajador).subscribe((resp: any) => {
      this.lsSolicitudxSupervisor = resp.aaData;
    })
   }

   cancelarSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion=Constantes.CANCELARSOLICITUD
    
    this.openModal(tmp_solicitud);
  }

  visualizarSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion="V"
    
    this.openModal(tmp_solicitud);
  }

   eliminarSolicitud(solicitud) {
    var tmp_Solicitud = Object.assign({}, solicitud);
    tmp_Solicitud.accion = Constantes.ELIMINAR;
    this.openModal(tmp_Solicitud);
  }

   openModal(indice) {
    if (indice.accion == "V") {

      this.modalRef = this.modalService.open(VisualizarSolicitudEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_solicitudDto = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
      
      
    } else {

      this.modalRef = this.modalService.open(ConfirmarEliminarSolicitudComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_solicitudDto = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  } 



}
