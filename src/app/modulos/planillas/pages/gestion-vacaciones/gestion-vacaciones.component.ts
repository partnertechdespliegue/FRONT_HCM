import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from '../../../trabajador/services/trabajador/trabajador.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Mes } from '../../../../models/Mes';
import { Año } from '../../../../models/Año';
import { Empresa } from '../../../../models/Empresa';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { MostrarVacacionesComponent } from './modals/mostrar-vacaciones/mostrar-vacaciones.component';
import { AdelantarVacacionesComponent } from './modals/adelantar-vacaciones/adelantar-vacaciones.component';

@Component({
  selector: 'app-gestion-vacaciones',
  templateUrl: './gestion-vacaciones.component.html',
  styles: []
})
export class GestionVacacionesComponent implements OnInit {

  empresa: Empresa = new Empresa();
  ano: Año = new Año();
  mes: Mes = new Mes();
  trabSeleccionado: any;
  lsTrabajadorPlanilla: any = [];
  lsTrabajadorHonorario: any = [];

  checkND: any;
  checkNB: any;

  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;


  constructor(
    public trabajadorService: TrabajadorService,
    private modalService: NgbModal,
    private router: Router,
    public activemodal: NgbActiveModal
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

  close() {
    this.activemodal.dismiss('Cancelado');
    this.refrescar(this.router.url);
  }
  public refrescar(url) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  mostrarPeriodosVacaTomar(trab) {
    const tmp = Object.assign({ accion: 'T' }, trab);
    this.openModal(tmp);
  }

  mostrarPeriodosVacaVender(trab) {
    const tmp = Object.assign({ accion: 'V' }, trab);
    this.openModal(tmp);
  }

  mostrarPeriodosVacaAdelantar(trab) {
    const tmp = Object.assign({ accion: 'A' }, trab);
    this.openModal(tmp);
  }

  public openModal(indice) {
    if(indice.accion !='A'){
      const modalRef = this.modalService.open(MostrarVacacionesComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',
       
        })
      modalRef.componentInstance.input_trabajador = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    }else{
      const modalRef = this.modalService.open(AdelantarVacacionesComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm',
       
        })
      modalRef.componentInstance.input_contrato = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    }

  }


}
