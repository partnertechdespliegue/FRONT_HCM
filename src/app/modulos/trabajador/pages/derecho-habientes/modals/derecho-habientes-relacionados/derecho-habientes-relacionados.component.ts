import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { DerechoHabiente } from '../../../../../../models/Derecho-Habiente';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { Trabajador } from '../../../../../../models/Trabajador';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfirmarDerechoHabienteComponent } from '../confirmar-derecho-habiente/confirmar-derecho-habiente.component';

@Component({
  selector: 'app-derecho-habientes-relacionados',
  templateUrl: './derecho-habientes-relacionados.component.html',
  styles: []
})
export class DerechoHabientesRelacionadosComponent implements OnInit {

  @Input() input_trabajador;

  lsDerHabReg: any[] = [];
  lsDerHabInac: any[] = [];
  trabajador: any = new Trabajador();
  selecArch: File;
  derHab: DerechoHabiente = new DerechoHabiente();
  abrir: boolean = true
  modalRef: NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private trabajadorService: TrabajadorService,
    public router: Router) { }

  ngOnInit() {
    this.trabajador = this.input_trabajador;
    this.listarDereHabActivo();
    this.listarDereHabInactivo();
  }

  listarDereHabActivo() {
    this.trabajadorService.listarDerHabActivo(this.trabajador).subscribe((resp: any) => {
      this.lsDerHabReg = resp.aaData;
    })
  }

  listarDereHabInactivo() {
    this.trabajadorService.listarDerHabInactivo(this.trabajador).subscribe((resp: any) => {
      this.lsDerHabInac = resp.aaData;
    })
  }

  public openModalConfirmar(derhab) {
    derhab.accion = "DB";
    this.modalRef = this.modalService.open(ConfirmarDerechoHabienteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_derHab = derhab;
    this.modalRef.componentInstance.input_trabajador = this.trabajador;
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  subirArchivo(archivo, derchoHabiente) {
    this.selecArch = archivo.target.files[0];
    this.derHab = derchoHabiente;
    this.cargarArchivo(this.derHab);
  }

  cargarArchivo(derchoHabiente) {
    const idDH = derchoHabiente.idDerechoHabiente;
    this.trabajadorService.subirArchivo(this.selecArch, idDH).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.listarDereHabActivo;
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    })
  }
}
