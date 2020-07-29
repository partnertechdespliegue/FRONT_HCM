import { Component, OnInit, OnDestroy } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { ConceptoPlanilla } from '../../../../models/ConceptoPlanilla';
import { CuentaContable } from '../../../../models/CuentaContable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoConceptoCuentaComponent } from './modals/nuevo-concepto-cuenta/nuevo-concepto-cuenta.component';
import { ConfirmarConceptoCuentaComponent } from './modals/confirmar-concepto-cuenta/confirmar-concepto-cuenta.component';
import { ConceptoCuentaService } from '../../services/concepto-cuenta/concepto-cuenta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { saveAs } from 'file-saver';
import { Mes } from '../../../../models/Mes';
import { Año } from '../../../../models/Año';

@Component({
  selector: 'app-conceptos-cuenta',
  templateUrl: './conceptos-cuenta.component.html',
  styles: []
})
export class ConceptosCuentaComponent implements OnInit, OnDestroy {

  empresa: Empresa = new Empresa();
  mostrar: boolean = true;
  ano: Año = new Año();
  mes: Mes = new Mes();

  lsconcepto: Array<any> = [];
  lscuenta: Array<any> = [];

  modalRef: NgbModalRef;

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public conceptoCuentaSercive: ConceptoCuentaService
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    if (this.empresa != null) {
      this.listarConceptoPlanilla();
      this.listarCuentaContable();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarConceptoPlanilla() {
    this.conceptoCuentaSercive.listarConceptoPlanilla(this.empresa).subscribe((resp: any) => {
      this.lsconcepto = resp.aaData;
    })
  }

  listarCuentaContable() {
    this.conceptoCuentaSercive.listarCuentaContable(this.empresa).subscribe((resp: any) => {
      this.lscuenta = resp.aaData;
    })
  }

  generarReporteCueCon() {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genReporteCueCon, "info");
    } else {


      var empresaDTO = {
        "empresa": this.empresa,
        "pdoAno": this.ano,
        "pdoMes": this.mes
      }
      this.conceptoCuentaSercive.generarReporteCueCon(empresaDTO).subscribe((resp: any) => {
        if (resp.estado == 1) {
          var nombreArchivo = "ReporteCtaCont.xls";
          this.conceptoCuentaSercive.descargarReporte(nombreArchivo).subscribe((result: any) => {
            var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(file, nombreArchivo);
            Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
          })
        }
      })
    }
  }

  public crearConcepto() {
    var concepto: any = new ConceptoPlanilla();
    concepto.accion = "RCO";
    this.openModal(concepto);
  }

  public actualizarConcepto(concepto) {
    var tmp = Object.assign({}, concepto);
    tmp.accion = "ACO";
    this.openModal(tmp);
  }

  public eliminarConcepto(concepto) {
    var tmp = Object.assign({}, concepto);
    tmp.accion = "DCO";
    this.openModal(tmp);
  }

  public crearCuenta() {
    var cuenta: any = new CuentaContable();
    cuenta.accion = "RCU";
    this.openModal(cuenta);
  }

  public actualizarCuenta(cuenta) {
    var tmp = Object.assign({}, cuenta);
    tmp.accion = "ACU";
    this.openModal(tmp);
  }

  public eliminarCuenta(cuenta) {
    var tmp = Object.assign({}, cuenta);
    tmp.accion = "DCU";
    this.openModal(tmp);
  }

  openModal(obj) {
    if (obj.accion != "DCO" && obj.accion != "DCU") {
      this.modalRef = this.modalService.open(NuevoConceptoCuentaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_concue = obj;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(ConfirmarConceptoCuentaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_concue = obj;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

}
