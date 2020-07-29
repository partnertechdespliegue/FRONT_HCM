import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoGestionTrabajadorComponent } from './modals/nuevo-gestion-trabajador/nuevo-gestion-trabajador.component';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { Empresa } from '../../../../models/Empresa';
import { NuevoGestionTrabajadorConfirmarComponent } from './modals/nuevo-gestion-trabajador-confirmar/nuevo-gestion-trabajador-confirmar.component';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { TipoComprobanteComponent } from './modals/tipo-comprobante/tipo-comprobante.component';
import { ReporteContratoComponent } from './modals/reporte-contrato/reporte-contrato.component';
import { GestionRemuDsctComponent } from './modals/gestion-remu-dsct/gestion-remu-dsct.component';
import { Router } from '@angular/router';
import { GestionHuellaDigitalComponent } from './modals/gestion-huella-digital/gestion-huella-digital.component';
import { HuelleroService } from '../../services/huellero/huellero.service';
import { Huellero } from '../../../../models/Huellero';

const publicIp = require('public-ip');

@Component({
  selector: 'app-gestion-trabajador',
  templateUrl: './gestion-trabajador.component.html',
  styles: []
})
export class GestionTrabajadorComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    public trabajadorService: TrabajadorService,
    public huelleroService: HuelleroService,
    private router: Router
  ) { }

  ipPublica: string;
  huellero: any = new Huellero();
  empresa: any = new Empresa();
  lsTrabajador: any[] = [];
  lsTrabajadorPlanilla: any[] = [];
  lsTrabajadorHonorario: any[] = [];
  expanded: boolean = false;
  tipoPlanilla: any;

  checkND: any;
  checkNB: any;

  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;

  modalRef: NgbModalRef;
  contratoGenerado: boolean;
  error: any;

  cerrar = false;

  ngOnInit() {
    (async () => {
      this.ipPublica = await publicIp.v4();
    })();
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.checkND = document.getElementById('numDoc');
    this.checkNB = document.getElementById('nomCmp');

    if (this.empresa != null) {
      this.listarTrabajadorPlanilla();
      this.listarTrabajadorHonorario();
    }
    this.checkAction();

  }

  ngOnDestroy() {
    if (this.modalRef != null && this.cerrar == false) {
      this.modalRef.close();
    }
  }

  /*liquidar(contrato) {
    var contratoDto = {
      "contrato": contrato,
      "pdoAno": JSON.parse(localStorage.getItem("anoSeleccion")),
      "pdoMes": JSON.parse(localStorage.getItem("mesSeleccion"))
    }
    this.trabajadorService.liquidar(contratoDto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.INFO, 'Nice', 'info');
      }
    })
  }*/

  gestionRemuDsct(trab) {
    var tmp = Object.assign({}, trab);
    tmp.accion = "G";
    this.openModal(tmp);
  }

  generarContrato(trab) {
    this.trabajadorService.generarContrato(trab).subscribe(resp => {
      this.contratoGenerado = true;
    });

    var tmp_tra = Object.assign({}, trab);
    tmp_tra.accion = Constantes.REPORTEWORD;
    this.openModal(tmp_tra);
  }

  gestionHuella(trab) {
    var tmp = Object.assign({}, trab);
    tmp.accion = "H";

    this.empresa.ruc = this.ipPublica;
    this.huelleroService.buscarHuellero(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.huellero = resp.defaultObj;
        this.huelleroService.iniciarHullero(this.huellero.sipPrivada).subscribe((respuesta: any) => {
          if (respuesta.estado == 1) {
            Swal.fire(Constantes.INFO, 'Coloque su dedo indice derecho 3 veces en el dispositivo', 'info');
            this.openModal(tmp);
          }
        })
      } else {
        Swal.fire(Constantes.INFO, resp.msg, 'info');
      }
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

  public listarTrabajadorPlanilla() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorPlanilla = resp.aaData;
        /* console.log(resp.aaData); */

      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error');
        this.error = err;
      })
  }

  public listarTrabajadorHonorario() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 2).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorHonorario = resp.aaData;
        /* console.log(resp.aaData); */
      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error');
        this.error = err;
      })
  }

  public actualizarTrabajador(trabajador_u) {
    var tmp_tra = Object.assign({}, trabajador_u);
    tmp_tra.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp_tra);
  }

  nuevoTrabajador() {
    var tmp_tra: any = {
      'accion': Constantes.REGISTRAR
    }
    this.openModal(tmp_tra);
  }


  public openModal(indice) {
    switch (indice.accion) {
      case 'U': this.modalRef = this.modalService.open(NuevoGestionTrabajadorComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalLG'
        })
        this.modalRef.componentInstance.input_trabajador_final = indice;
        break;

      case 'D': this.modalRef = this.modalService.open(NuevoGestionTrabajadorConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
        this.modalRef.componentInstance.input_trabajador_final = indice;
        break;

      case 'G': this.modalRef = this.modalService.open(GestionRemuDsctComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',
          windowClass: 'modal-mdC'
        }
      );
        this.modalRef.componentInstance.input_trab = indice;
        this.modalRef.result.then((result) => {
        }, (reason) => {
          if (reason == "refrescar") {
            indice.accion = "G"
            this.cerrar = true;
            this.refrescar(this.router.url);
            this.openModal(indice)
          }
        });
        break;

      case 'W': this.modalRef = this.modalService.open(ReporteContratoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-md'
        }
      );
        this.modalRef.componentInstance.input_contrato = indice;
        break;

      case 'H':
        this.modalRef = this.modalService.open(GestionHuellaDigitalComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modal-md'
          });
        this.modalRef.componentInstance.input_contrato = indice;
        break;

      default: this.modalRef = this.modalService.open(TipoComprobanteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
    }

  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}
