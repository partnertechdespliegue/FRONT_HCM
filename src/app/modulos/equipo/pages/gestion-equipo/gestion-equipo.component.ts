import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GestionEquipoService } from '../../services/gestion-equipo/gestion-equipo.service';
import { NuevaSolicitudComponent } from './modals/nueva-solicitud/nueva-solicitud.component';

@Component({
  selector: 'app-gestion-equipo',
  templateUrl: './gestion-equipo.component.html',
  styles: []
})
export class GestionEquipoComponent implements OnInit {

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public gestionEquipoService: GestionEquipoService
  ) { }

  empresa: Empresa = new Empresa();
  token: any;

  checkND: any;
  checkNB: any;

  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;

  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.token = JSON.parse(localStorage.getItem('InfoToken'));
    this.checkND = document.getElementById('numDoc');
    this.checkNB = document.getElementById('nomCmp');
    if (this.empresa != null) {
      this.checkAction();
    }
  }

  checkAction() {
    // this.filterPost = "";

    // if (this.checkND.checked == true) {
    //   this.mostrarPH = "Ingrese numero de documento";
    //   this.filterBoolean = true;
    // } else {
    //   this.mostrarPH = "Apellido paterno + Apellido Materno + Nombres";
    //   this.filterBoolean = false;
    // }
  }

  registrarSolicitud() {
    this.modalRef = this.modalService.open(NuevaSolicitudComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
