import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { Sctr } from '../../../../models/Sctr';
import { NuevaSctrComponent } from './modals/nueva-sctr/nueva-sctr.component';
import { SctrService } from '../../services/sctr/sctr.service';
import { ConfirmarNuevaSctrComponent } from './modals/confirmar-nueva-sctr/confirmar-nueva-sctr.component';
import Constantes from '../../../../models/Constantes';


@Component({
  selector: 'app-sctr',
  templateUrl: './sctr.component.html',
  styles: []
})
export class SctrComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private SctrService: SctrService
  ) { }

  empresa: Empresa = new Empresa();
  public listSctr: Array<any> = [];
  public Sctr: Sctr = new Sctr();

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (tmp != null) {
      this.empresa.idEmpresa = tmp.idEmpresa;
    }
    this.listarSctr();
  }

  listarSctr() {
    this.SctrService.listarSctr().subscribe((resp: any) => {
      this.listSctr = resp.aaData;
    });
  }

  crearSctr() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarSctr(sctr_u) {
    var tmp_sctr = Object.assign({}, sctr_u);
    tmp_sctr.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp_sctr);
  }

  eliminarSctr(sctr_u) {
    var tmp_sctr = Object.assign({}, sctr_u);
    tmp_sctr.accion = Constantes.ELIMINAR;
    this.openModal(tmp_sctr);
  }

  public openModal(indice) {
    if (indice == null || indice.accion != "D") {
      const modalRef = this.modalService.open(NuevaSctrComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      modalRef.componentInstance.input_sctr = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      const modalRef = this.modalService.open(ConfirmarNuevaSctrComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      modalRef.componentInstance.input_sctr = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }
}