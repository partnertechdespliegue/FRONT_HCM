import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { AsistenciaService } from '../../services/asistencia/asistencia.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import Constantes from '../../../../models/Constantes';
import Swal from 'sweetalert2';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { MostrarAsistenciasComponent } from './modals/mostrar-asistencias/mostrar-asistencias.component';
import { Año } from '../../../../models/Año';
import { Mes } from '../../../../models/Mes';
import { MostrarFaltasComponent } from './modals/mostrar-faltas/mostrar-faltas.component';
import { MostrarPermisoComponent } from './modals/mostrar-permisos/mostrar-permisos.component';


@Component({
  selector: 'app-control-asistencia',
  templateUrl: './control-asistencia.component.html',
  styles: []
})
export class ControlAsistenciaComponent implements OnInit, OnDestroy {

  empresa: Empresa = new Empresa();
  ano: Año = new Año();
  mes: Mes = new Mes();
  trabSeleccionado: any;
  lsTrabajadorPlanilla: any = [];
  lsTrabajadorHonorario: any = [];
  lsTrabajador: any = [];
  fecha_inicio: Date;


  checkND: any;
  checkNB: any;

  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;
  modalRef: NgbModalRef

  constructor(
    public asistenciaService: AsistenciaService,
    public trabajadorService: TrabajadorService,
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.checkND = document.getElementById('numDoc');
    this.checkNB = document.getElementById('nomCmp');

    if (this.empresa != null) {
      this.listarTrabPlanilla();
      this.listarTrabHonorario();
    }
    this.checkAction();
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
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

  public listarTrabPlanilla() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorPlanilla = resp.aaData;
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error'); })
  }

  public listarTrabHonorario() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 2).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorHonorario = resp.aaData;
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error'); })
  }

  mostrarRegistroAsistencias(trab) {
    const tmp = Object.assign({ accion: 'A' }, trab);
    this.openModal(tmp);
  }

  mostrarRegistroFaltas(trab) {
    const tmp = Object.assign({ accion: 'F' }, trab);
    this.openModal(tmp);
  }

  mostrarRegistroPermisos(trab) {
    const tmp = Object.assign({ accion: 'P' }, trab);
    this.openModal(tmp);
  }

  public openModal(trab) {
    if (this.ano == null || this.mes == null) {
      Swal.fire(
        Constantes.INFO,
        "Selecciona un periodo para registrar asistencia",
        "info"
      );
    } else {
      this.fecha_inicio = new Date(trab.fecInicio);

      if (this.ano.descripcion < this.fecha_inicio.getFullYear()) {
        Swal.fire(
          Constantes.INFO,
          `El trabajador ingreso en el año ${this.fecha_inicio.getFullYear()}, selecciona un año distinto`,
          "warning"
        );
      } else {
        if (
          this.mes.idPdoMes < this.fecha_inicio.getMonth() + 1 &&
          this.ano.descripcion <= this.fecha_inicio.getFullYear()
        ) {
          Swal.fire(
            Constantes.INFO,
            `El trabajador ingreso en el mes de ${this.obtenerDescMes(
              this.fecha_inicio.getMonth()
            )}, selecciona un mes distinto`,
            "warning"
          );
        } else {
          switch (trab.accion) {
            case 'A': this.openModalAsistencia(trab); break;
            case 'F': this.openModalFaltas(trab); break;
            default: this.openModalPermisos(trab); break;
          }
        }
      }
    }
  }

  public openModalAsistencia(indice) {
    this.modalRef = this.modalService.open(MostrarAsistenciasComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalLG'
      })
      this.modalRef.componentInstance.input_trabajador = indice;
      this.modalRef.componentInstance.input_ano = this.ano;
      this.modalRef.componentInstance.input_mes = this.mes;
      this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  public openModalFaltas(indice) {
    this.modalRef = this.modalService.open(MostrarFaltasComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalLG'
      })
      this.modalRef.componentInstance.input_trabajador = indice;
    this.modalRef.componentInstance.input_ano = this.ano;
    this.modalRef.componentInstance.input_mes = this.mes;
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  public openModalPermisos(indice) {
    this.modalRef = this.modalService.open(MostrarPermisoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalLG'
      })
    this.modalRef.componentInstance.input_trabajador = indice;
    this.modalRef.componentInstance.input_ano = this.ano;
    this.modalRef.componentInstance.input_mes = this.mes;
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  obtenerDescMes(valor): String {
    switch (valor) {
      case 0:
        return "ENERO";
      case 1:
        return "FEBRERO";
      case 2:
        return "MARZO";
      case 3:
        return "ABRIL";
      case 4:
        return "MAYO";
      case 5:
        return "JUNIO";
      case 6:
        return "JULIO";
      case 7:
        return "AGOSTO";
      case 8:
        return "SETIEMBRE";
      case 9:
        return "OCTUBRE";
      case 10:
        return "NOVIEMBRE";
      case 11:
        return "DICIEMBRE";
      default:
        return "INDEFINIDO";
    }
  }
}