import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { NuevoRemuDsctComponent } from '../nuevo-remu-dsct/nuevo-remu-dsct.component';
import { ConfirmarRemuDsctComponent } from '../confirmar-remu-dsct/confirmar-remu-dsct.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-remu-dsct',
  templateUrl: './gestion-remu-dsct.component.html',
  styles: []
})
export class GestionRemuDsctComponent implements OnInit, OnDestroy {

  @Input() input_trab;

  trabajador: Trabajador = new Trabajador();
  lsTrabRemu: any[] = [];
  lsTrabDsct: any[] = [];
  lsTrabRemuInac: any[] = [];
  lsTrabDsctInac: any[] = [];
  modalRef: NgbModalRef

  constructor(
    private activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private trabajadorService: TrabajadorService,
  ) {}

  ngOnInit() {
    this.trabajador = this.input_trab;
    this.listarTrabRemu(this.trabajador);
    this.listarTrabDsct(this.trabajador);
    this.listarTrabRemuInac(this.trabajador);
    this.listarTrabDsctInac(this.trabajador);
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  listarTrabRemu(trab) { 
    this.trabajadorService.listarTrabRemu(trab).subscribe((resp: any) => {
      this.lsTrabRemu = resp.aaData;
    })
  }

  listarTrabDsct(trab) { 
    this.trabajadorService.listarTrabDsct(trab).subscribe((resp: any) => {
      this.lsTrabDsct = resp.aaData;
    })
  }

  listarTrabRemuInac(trab) { 
    this.trabajadorService.listarTrabRemuInac(trab).subscribe((resp: any) => {
      this.lsTrabRemuInac = resp.aaData;
    })
  }

  listarTrabDsctInac(trab) { 
    this.trabajadorService.listarTrabDsctInac(trab).subscribe((resp: any) => {
      this.lsTrabDsctInac = resp.aaData;
    })
  }

  nuevoTrabRemu() {
    this.trabajador.accion = "R";
    this.openModal(this.trabajador);
  }

  nuevoTrabDsct() {
    this.trabajador.accion = "D";
    this.openModal(this.trabajador);
  }

  darBajaRemu(trabRemu) {
    var tmp = Object.assign({}, trabRemu);
    tmp.accion = "DBR";
    this.openModal(tmp);
  }
  darBajaDsct(trabDsct) {
    var tmp = Object.assign({}, trabDsct);
    tmp.accion = "DBD";
    this.openModal(tmp);
  }

  activarRemu(trabRemu) {
    var tmp = Object.assign({}, trabRemu);
    tmp.accion = "AR";
    this.openModal(tmp);
  }

  activarDsct(trabDsct) {
    var tmp = Object.assign({}, trabDsct);
    tmp.accion = "AD";
    this.openModal(tmp);
  }

  openModal(indice) { 
    if (indice.accion == "R" || indice.accion == "D") {
      this.modalRef = this.modalService.open(NuevoRemuDsctComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_trab = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.dismiss('refrescar');
      });

    } else {
      this.modalRef = this.modalService.open(ConfirmarRemuDsctComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.componentInstance.input_trabRemDsct = indice;
        this.modalRef.result.then((result) => { 
      }, (reason) => {
        this.activemodal.dismiss('refrescar');    
      });
    }
  }

}
