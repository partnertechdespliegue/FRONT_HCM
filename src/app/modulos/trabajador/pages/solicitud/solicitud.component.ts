import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Empresa } from '../../../../models/Empresa';



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
  lsSolicitudxEmpresa: any [] = [];
  lsSolicitudxSupervisor: any [] = [];
  //estado: any[] = Constantes.ESTADOSOLICITUD;
  //empresa: any = new Empresa();

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.listarSolicitudxEmpresa();
  }

  listarSolicitudxEmpresa() {
    this.solicitudService.listarSolicitudxEmpresa(this.empresa).subscribe((resp: any) => {
      this.lsSolicitudxEmpresa = resp.aaData;
    })
  }

 /*  listarSolicitudxSupervisor() {
    this.solicitudService.listarSolicitudxSupervisor(this.trabajador).subscribe((resp: any) => {
      this.lsSolicitudxSupervisor = resp.aaData;
    })
   }*/

}
