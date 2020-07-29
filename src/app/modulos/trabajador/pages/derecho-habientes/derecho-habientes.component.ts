import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { Trabajador } from '../../../../models/Trabajador';
import { Empresa } from '../../../../models/Empresa';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DerechoHabientesRelacionadosComponent } from './modals/derecho-habientes-relacionados/derecho-habientes-relacionados.component';
import { DerechoHabiente } from '../../../../models/Derecho-Habiente';
import { NuevoDerechoHabienteComponent } from './modals/nuevo-derecho-habiente/nuevo-derecho-habiente.component';

@Component({
  selector: 'app-derecho-habientes',
  templateUrl: './derecho-habientes.component.html',
  styles: []
})
export class DerechoHabientesComponent implements OnInit , OnDestroy{

  constructor(public modalService: NgbModal, private trabajadorService: TrabajadorService) { }

  lsTrabajador: any[] = [];
  empresa: Empresa = new Empresa();
  derechoH: DerechoHabiente = new DerechoHabiente;

  checkND: any;
  checkNB: any;
  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;
  modalRef: NgbModalRef

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.checkND = document.getElementById('numDoc');
    this.checkNB = document.getElementById('nomCmp');

    if (this.empresa != null) {
      this.listarTrabXEmp()
      this.checkAction();
    }
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
        this.modalRef.close();
    }
}

  listarTrabXEmp() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      this.lsTrabajador = resp.aaData;
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

  verDerHab(trabajador) {
    var tmp_trab=Object.assign({},trabajador);
    tmp_trab.accion="V";
    this.openModal(tmp_trab);
  }

  regisDerHab(trabajador){
    var tmp_trab=Object.assign({},trabajador);
    tmp_trab.accion="R";
    this.openModal(tmp_trab);
  }

  openModal(indice) {
    if (indice.accion=="V") {
      this.modalRef = this.modalService.open(DerechoHabientesRelacionadosComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_trabajador = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      this.modalRef = this.modalService.open(NuevoDerechoHabienteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdB'
        })
      this.modalRef.componentInstance.input_trabajador = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }
}
