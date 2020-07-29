import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Empresa } from '../../../../models/Empresa';
import { PlanillasService } from '../../services/planillas/planillas.service';
import Constantes from '../../../../models/Constantes';
import { SolicitarAdelantoSueldoComponent } from './modals/solicitar-adelanto-sueldo/solicitar-adelanto-sueldo.component';
import { MostrarAdelantoSueldoComponent } from './modals/mostrar-adelanto-sueldo/mostrar-adelanto-sueldo.component';

@Component({
  selector: 'app-adelanto-sueldo',
  templateUrl: './adelanto-sueldo.component.html',
  styles: []
})
export class AdelantoSueldoComponent implements OnInit, OnDestroy {

  constructor(
    public planillasService: PlanillasService,
    private modalService: NgbModal,
    private router: Router,
    public activemodal: NgbActiveModal
  ) { }

  lsTrabajadorPlanilla: any[] = [];
  empresa: Empresa = new Empresa();

  checkND: any;
  checkNB: any;
  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;
  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    this.checkND = document.getElementById('numDoc');
    this.checkNB = document.getElementById('nomCmp');
    if (this.empresa != null) {
      this.listarTrabPlanilla()
    }
    this.checkAction();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTrabPlanilla() {
    this.planillasService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      this.lsTrabajadorPlanilla = resp.aaData;
    })
  }

  checkAction() {
    this.filterPost = "";

    if (this.checkND.checked == true) {
      this.mostrarPH = "Ingrese numero de documento";
      this.filterBoolean = true;
    } else {
      this.mostrarPH = "Apellido paterno + Apellido Materno + Nombres";
      this.filterBoolean = false;
    }
  }

  solicitarAs(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = Constantes.REGISTRAR;
    this.openModal(tmp);
  }

  mostrarAS(trabajador) {
    var tmp = Object.assign({}, trabajador);
    tmp.accion = Constantes.MOSTRAR;
    //mostrar = M
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice.accion == "R") {
      this.modalRef = this.modalService.open(SolicitarAdelantoSueldoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdB'
        })
      this.modalRef.componentInstance.input_contrato = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(MostrarAdelantoSueldoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_trabajador = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }


}
