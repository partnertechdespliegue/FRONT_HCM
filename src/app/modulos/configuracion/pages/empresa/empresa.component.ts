import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NuevoEmpresaComponent } from './modals/nuevo-empresa/nuevo-empresa.component';
import { Empresa } from '../../../../models/Empresa';
import { EmpresaService } from '../../services/empresa/empresa.service';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevoEmpresaComponent } from './modals/confirmar-nuevo-empresa/confirmar-nuevo-empresa.component';
import { Router } from '@angular/router';
import { MostrarEncargadoPlanillaComponent } from './modals/mostrar-encargado-planilla/mostrar-encargado-planilla.component';
import { MostrarCuentaCargoComponent } from './modals/mostrar-cuenta-cargo/mostrar-cuenta-cargo.component';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    public empresaService: EmpresaService,
    public router: Router
  ) { }

  public lsEmpresas: any[] = [];
  public objEmpresa_final: any = null;
  cerrar:boolean =false;
  modalRef:NgbModalRef;

  ngOnInit() {
    this.listarEmpresa();
  }

  ngOnDestroy(){
    if (this.modalRef != null  && this.cerrar == false) {
      this.modalRef.close();
    }
  }

  public listarEmpresa() {
    this.empresaService.listarEmpresa().subscribe(resp => {
      if (resp.estado == 1) {
        this.lsEmpresas = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  listarEncargadoPlan(empresa) {
    var empresa_tmp = Object.assign({}, empresa);
    empresa_tmp.accion = "LEP";
    this.openModal(empresa_tmp)
  }

  listarCuentaCargo(empresa) {
    var tmp = Object.assign({}, empresa);
    tmp.accion = "LCC";
    this.openModal(tmp)
  }

  nuevoEmpresa() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarEmpresa(empresa_u) {
    var empresa_tmp = Object.assign({}, empresa_u);
    empresa_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(empresa_tmp);
  }

  eliminarEmpresa(empresa_d) {
    var empresa_tmp = Object.assign({}, empresa_d);
    empresa_tmp.accion = Constantes.ELIMINAR;
    this.openModal(empresa_tmp);
  }

  armarObjeto(empresa) {
    this.objEmpresa_final = {
      "empresa": empresa,
    }
  }

  public openModal(indice) {
    this.armarObjeto(indice);
    if (indice == null || indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        }
      );
      this.modalRef.componentInstance.input_empresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "LEP") {
      this.modalRef = this.modalService.open(MostrarEncargadoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdB'
        }
      );
      this.modalRef.componentInstance.input_empresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason == "accion") {
          this.cerrar=true;
          this.refrescar(this.router.url);
          this.openModal(indice)
         }
      });
    } else if (indice.accion == "LCC") {
      this.modalRef = this.modalService.open(MostrarCuentaCargoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',
          windowClass: 'modal-mdCC'
        }
      );
      this.modalRef.componentInstance.input_empresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        if (reason == "accion") {
          this.cerrar=true;
          this.refrescar(this.router.url);
          this.openModal(indice)
         }
      });
    } else {
      this.modalRef = this.modalService.open(ConfirmarNuevoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_empresa = this.objEmpresa_final;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }
}
