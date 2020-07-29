import { Component, OnInit, OnDestroy } from '@angular/core';
import { RemuneracionesService } from '../../services/remuneraciones/remuneraciones.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Empresa } from '../../../../models/Empresa';
import Constantes from '../../../../models/Constantes';
import { NuevaRemuneracionComponent } from './modals/nueva-remuneracion/nueva-remuneracion.component';
import { NuevaRemuneracionConfirmarComponent } from './modals/nueva-remuneracion-confirmar/nueva-remuneracion-confirmar.component';

@Component({
  selector: 'app-remuneraciones',
  templateUrl: './remuneraciones.component.html',
  styles: []
})
export class RemuneracionesComponent implements OnInit, OnDestroy {

  empresa: Empresa = new Empresa();
  lsRemuneracion: any[] = [];
  lsRemuneracionInac: any[] = [];
  modalRef: NgbModalRef;

  constructor(
    private remuneracionService: RemuneracionesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarRem();
      this.listarRemInac();
    }
  }
  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarRem() {
    this.remuneracionService.listar(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRemuneracion = resp.aaData;
      }
    })
  }

  listarRemInac() {
    this.remuneracionService.listarInac(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRemuneracionInac = resp.aaData;
      }
    })
  }

  registrarRem() {
    let indice = null;
    this.openModal(indice);
  }

  modificarRem(rem) {
    var tmp = Object.assign({}, rem);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  darBajaRem(rem) {
    var tmp = Object.assign({}, rem);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  activarRem(rem) {
    var tmp = Object.assign({}, rem);
    tmp.accion = "A";
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(NuevaRemuneracionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_rem = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevaRemuneracionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdC'
        })
      this.modalRef.componentInstance.input_rem = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(NuevaRemuneracionConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_rem = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }


}
