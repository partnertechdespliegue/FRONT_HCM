import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalculoPlanillaComponent } from "./modals/calculo-planilla/calculo-planilla.component";
import { Router } from "@angular/router";
import { PlanillasService } from "../../services/planillas/planillas.service";
import { Empresa } from "../../../../models/Empresa";
import Swal from "sweetalert2";
import Constantes from "../../../../models/Constantes";
import { MostrarBoletaComponent } from "./modals/mostrar-boleta/mostrar-boleta.component";
import { Año } from "../../../../models/Año";
import { Mes } from "../../../../models/Mes";
import { MostrarRheComponent } from './modals/mostrar-rhe/mostrar-rhe.component';
import { Trabajador } from "../../../../models/Trabajador";
import { GenerarTxtComponent } from './modals/generar-txt/generar-txt.component';
import { TipoPlanillaService } from '../../../configuracion/services/tipo-planilla/tipo-planilla.service';
import { TipoPlanilla } from '../../../../models/Tipo-Planilla';
import { ConfirmarCalculoPlanillaComponent } from './modals/confirmar-calculo-planilla/confirmar-calculo-planilla.component';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { finalize } from 'rxjs/operators';


@Component({
  selector: "app-generar-planilla",
  templateUrl: "./generar-planilla.component.html",
  styles: []
})
export class GenerarPlanillaComponent implements OnInit, OnDestroy {
  constructor(
    public planillasService: PlanillasService,
    public tipoPlanillaService: TipoPlanillaService,
    public modalService: NgbModal,
    private router: Router,
    public activemodal: NgbActiveModal
  ) { }

  empresa: Empresa = new Empresa();
  lsTrabajador: any[] = [];
  ano: Año = new Año();
  mes: Mes = new Mes();
  tipo_tardanza: any;
  tipo_rango: any;
  id_tipo_tardanza: any;
  selecArch: File;
  infoToken: any;

  trabajador: Trabajador = new Trabajador();
  tipoPlan: TipoPlanilla = new TipoPlanilla();

  lsderHab: Array<any> = Constantes.DerechoHab;


  checkND: any;
  checkNB: any;

  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;

  lsTrabajadorPlanilla: any[] = [];
  lsTrabajadorHonorario: any[] = [];
  lsTipoPlanilla: any[] = [];
  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.infoToken = JSON.parse(localStorage.getItem("InfoToken"));

    this.checkND = document.getElementById('numDoc');
    this.checkNB = document.getElementById('nomCmp');
    if (this.empresa != null) {
      this.checkAction()
      this.guardarTardanzaLocal();
      this.listarTiposPlanillaPorPerfil();
    }

    var tmpTipPlan = JSON.parse(localStorage.getItem("tipoPlanilla"));
    if (tmpTipPlan != null) {
      this.tipoPlan = tmpTipPlan;
      this.listarTrabajadoresPorTipoPlanilla()
    }

  }

  listarTiposPlanillaPorPerfil() {
    var perfil = {
      "idPerfil": this.infoToken.id_perfil
    }
    this.tipoPlanillaService.listarTipoPlanillaPorPerfil(perfil).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoPlanilla = resp.aaData;
      }
    })
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
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

  listarTrabajadoresPorTipoPlanilla(){
    if (this.tipoPlan.categoriaPlanilla == 5) {
      this.tipoPlanillaService.listarTrabajadoresPorTipoPlanilla(this.tipoPlan).subscribe((resp: any) => {
        this.lsTrabajadorPlanilla = resp.aaData;
      });
    } else {
      this.tipoPlanillaService.listarTrabajadoresPorTipoPlanilla(this.tipoPlan).subscribe((resp: any) => {
        this.lsTrabajadorHonorario = resp.aaData;
      })
    }
  }

  changeTipoPlanilla(tipoPlanilla) {
    // this.listarTiposPlanillaPorPerfil();
    if (tipoPlanilla != null) {
      this.tipoPlan = tipoPlanilla;
      localStorage.setItem("tipoPlanilla", JSON.stringify(tipoPlanilla));
      this.listarTrabajadoresPorTipoPlanilla();
    } else {
      localStorage.removeItem("tipoPlanilla");
      // this.tipoPlan.categoriaPlanilla = 0;
    }
  }

  calcularPlanillaMasiva(){
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO,Constantes.genPlanillaMasiva,"info");
    } else {
      var tmp_tardanza = JSON.parse(localStorage.getItem("tipoDeTardanza"));
      const planillaFinal = {
        "contrato":null,
        "tipoPlanilla":this.tipoPlan,
        "tardanza":tmp_tardanza,
        "pdoAno":this.ano,
        "pdoMes":this.mes
      }
      this.openConfirmarModal(planillaFinal)
    }
  }

  public openConfirmarModal(planillaFinal) {
    this.modalRef = this.modalService.open(ConfirmarCalculoPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      });
    this.modalRef.componentInstance.input_planilla_final = planillaFinal;
    this.modalRef.result.then(
      result => {
      },
      reason => { }
    );
  }

  calcularPlanilla(indice) {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genPlanilla, "info" );
    } else {
      var fech_ini: Date = new Date(indice.fecInicio);

      if (this.ano.descripcion < fech_ini.getFullYear()) {
        Swal.fire(
          Constantes.INFO,
          `El trabajador ingreso en el año ${fech_ini.getFullYear()}, selecciona un año distinto`,
          "warning"
        );
      } else {
        if (
          this.mes.idPdoMes < fech_ini.getMonth() + 1 &&
          this.ano.descripcion <= fech_ini.getFullYear()
        ) {
          Swal.fire(
            Constantes.INFO,
            `El trabajador ingreso en el mes de ${this.obtenerDescMes(
              fech_ini.getMonth()
            )}, selecciona un mes distinto`,
            "warning"
          );
        } else {
          var tmp_ano=JSON.parse(localStorage.getItem("anoSeleccion"));
          var tmp_mes=JSON.parse(localStorage.getItem("mesSeleccion"));
          var tmp_tardanza = JSON.parse(localStorage.getItem("tipoDeTardanza"));
          var tmp_tiporango;
          switch(tmp_tardanza.valor){
            case "2": tmp_tiporango = JSON.parse(localStorage.getItem("tipoDeRango"));break;
            default :  tmp_tiporango = null;
          }
          var planilla_final={
            "contrato": indice,
            "tipoPlanilla":this.tipoPlan,
            "tardanza":tmp_tardanza,
            "tipoRango":tmp_tiporango,
            "pdoAno":tmp_ano,
            "pdoMes":tmp_mes
          }
          this.openModal(planilla_final);
        }
      }
    }
  }

  mostrarBoletas(indice) {
    this.openModalBoleta(indice);
  }

  public refrescar(url) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  guardarTardanzaLocal() {
    var tmp_tardanza = {
      codigo: String,
      descripcion: String,
      estado: Number,
      grupo: String,
      idParametro: Number,
      nombre: String,
      valor: String
    };

    this.planillasService
      .obtenerTipoTardanza(this.empresa)
      .subscribe((resp: any) => {
        if (resp != null) {
          this.tipo_tardanza = resp.defaultObj;
          tmp_tardanza = this.tipo_tardanza;
          this.id_tipo_tardanza = this.tipo_tardanza.valor;
          localStorage.setItem("tipoDeTardanza", JSON.stringify(tmp_tardanza));
          this.indicarTipoTard();
        } else {
          Swal.fire(Constantes.ERROR, "No se encontro el parametro", "error");
        }
      });
  }

  obtenerTipodeRango() {
    var tmp_rango = {
      codigo: String,
      descripcion: String,
      estado: Number,
      grupo: String,
      idParametro: Number,
      nombre: String,
      valor: String
    };
    this.planillasService
      .obtenerTipoRango(this.empresa)
      .subscribe((resp: any) => {
        if (resp != null) {
          this.tipo_rango = resp.defaultObj;
          tmp_rango = this.tipo_rango;
          localStorage.setItem("tipoDeRango", JSON.stringify(tmp_rango));
        } else {
          Swal.fire(Constantes.ERROR, "No se encontro el rango", "error");
        }
      });
  }

  indicarTipoTard() {
    switch (this.id_tipo_tardanza) {
      case "1":
        localStorage.removeItem("tipoDeRango");
        break;
      case "2":
        this.obtenerTipodeRango();
        break;
    }
  }

  public openModal(indice) {
    this.modalRef = this.modalService.open(ConfirmarCalculoPlanillaComponent, {
      backdrop: "static",
      keyboard: false,
      size: 'sm'
    });
    this.modalRef.componentInstance.input_planilla_final = indice;
    //this.modalRef.componentInstance.input_tipoPlan = this.tipoPlan;
    this.modalRef.result.then(
      result => {
        // this.refrescar(this.router.url);
      },
      reason => { }
    );
  }

  public openModalBoleta(indice) {
    this.modalRef = this.modalService.open(MostrarBoletaComponent, {
      backdrop: "static",
      keyboard: false,
      size: "lg"
    });
    this.modalRef.componentInstance.input_trabajador = indice;
    this.modalRef.result.then(
      result => { },
      reason => { }
    );
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


  abrirRHE(indice) {
    const modalRef = this.modalService.open(MostrarRheComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        windowClass: 'modal-mdC'
      })
    modalRef.componentInstance.input_Trab = indice;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  subirArchivo(archivo, trab) {
    this.selecArch = archivo.target.files[0];
    // this.trabajador = trab
    this.cargarArchivo(trab)
  }

  cargarArchivo(trab) {
    const idTrab = trab.idTrabajador;
    this.planillasService.subirArchivo(this.selecArch, idTrab).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        // this.listarTrabajadorHonorario();
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
        // this.listarTrabajadorHonorario();
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    })
  }

  generarTxtGeneral() {
    const indice = null;
    this.openModalTxt(indice);
  }

  generarTxtPersonal(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = "G";
    this.openModalTxt(tmp);
  }

  openModalTxt(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(GenerarTxtComponent, {
        backdrop: "static",
        keyboard: false,
        windowClass: 'modalMD'
      });
      this.modalRef.componentInstance.input_contrato = indice;
      this.modalRef.result.then(
        result => { },
        reason => { }
      );
    } else {
      this.modalRef = this.modalService.open(GenerarTxtComponent, {
        backdrop: "static",
        keyboard: false,
        windowClass: 'modalMD'
      });
      this.modalRef.componentInstance.input_contrato = indice;
      this.modalRef.result.then(
        result => { },
        reason => { }
      );
    }

  }

}
