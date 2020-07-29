import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-remu-dsct',
  templateUrl: './confirmar-remu-dsct.component.html',
  styles: []
})
export class ConfirmarRemuDsctComponent implements OnInit {

  @Input() input_trabRemDsct;

  objTrabRemu: any = null;
  objTrabDsct: any = null;

  constructor(
    public activemodal: NgbActiveModal,
    private trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {

    if (this.input_trabRemDsct.accion == "DBR" || this.input_trabRemDsct.accion == "AR") {
      this.objTrabRemu = this.input_trabRemDsct;
    } else if (this.input_trabRemDsct.accion == "DBD" || this.input_trabRemDsct.accion == "AD") {
      this.objTrabDsct = this.input_trabRemDsct;
    }
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  accion() {
    if (this.objTrabRemu != null) {
      if (this.objTrabRemu.accion == "DBR") {
        this.darBajaRemu();
      } else {
        this.activarRemu();
      }
    } else {
      if (this.objTrabDsct.accion == "DBD") {
        this.darBajaDsct();
      } else {
        this.activarDsct();
      }
    }
  }

  darBajaRemu() {
    this.trabajadorService.darBajaRemu(this.objTrabRemu).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  darBajaDsct() {
    this.trabajadorService.darBajaDsct(this.objTrabDsct).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  activarRemu() {
    this.trabajadorService.activarRemu(this.objTrabRemu).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  activarDsct() {
    this.trabajadorService.activarDsct(this.objTrabDsct).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

}
