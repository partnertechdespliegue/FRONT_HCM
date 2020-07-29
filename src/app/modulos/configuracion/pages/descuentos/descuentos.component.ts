import { Component, OnInit, OnDestroy } from '@angular/core';
import { DescuentosService } from '../../services/descuentos/descuentos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import Constantes from '../../../../models/Constantes';
import { NuevoDescuentoComponent } from './modals/nuevo-descuento/nuevo-descuento.component';
import { NuevoDescuentoConfirmarComponent } from './modals/nuevo-descuento-confirmar/nuevo-descuento-confirmar.component';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styles: []
})
export class DescuentosComponent implements OnInit, OnDestroy {

  lsDsct: any[] = [];
  lsDsctInac: any[] = [];
  empresa: Empresa = new Empresa();
  modalRef: NgbModalRef;

  constructor(
    private descuentoService: DescuentosService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarDsct();
      this.listarDsctInac();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarDsct() {
    this.descuentoService.listarDsct(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDsct = resp.aaData;
      }
    })
  }

  listarDsctInac() {
    this.descuentoService.listarDsctInac(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDsctInac = resp.aaData;
      }
    })
  }

  registrarDsct() {
    let indice = null;
    this.openModal(indice);
  }

  modificarDsct(dsct) {
    var tmp = Object.assign({}, dsct);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  darBajaDsct(dsct) {
    var tmp = Object.assign({}, dsct);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  activarDsct(dsct) {
    var tmp = Object.assign({}, dsct);
    tmp.accion = "A";
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(NuevoDescuentoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_dsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevoDescuentoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_dsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(NuevoDescuentoConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_dsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

}
