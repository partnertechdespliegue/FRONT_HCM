import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NuevoSistPensionComponent } from './modals/nuevo-sist-pension/nuevo-sist-pension.component';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevoSistPensionComponent } from './modals/confirmar-nuevo-sist-pension/confirmar-nuevo-sist-pension.component';
import { AfpService } from '../../services/afp/afp.service';


@Component({
  selector: 'app-datos-afp-onp',
  templateUrl: './datos-afp-onp.component.html',
  styles: []
})
export class DatosAfpOnpComponent implements OnInit, OnDestroy {

  modalRef:NgbModalRef;

  constructor(
    private modalService: NgbModal,
    public afpService: AfpService,
    public router: Router
  ) { }

  public lsAfps: any[] = [];
  empresa: Empresa = new Empresa();

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (tmp != null) {
      this.empresa.idEmpresa = tmp.idEmpresa;
      this.listarAfps();
    }
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }

  public listarAfps() {
    this.afpService.listarAfp(this.empresa).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsAfps = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }

    });
  }

  public actualizarAfp(afp) {
    var afp_tmp = Object.assign({}, afp);
    afp_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(afp_tmp);
  }

  public eliminarAfp(afp) {
    var afp_tmp = Object.assign({}, afp);
    afp_tmp.accion = Constantes.ELIMINAR;
    this.openModal(afp_tmp);
  }
  public nuevoSistPension() {
    let indice = null;
    this.openModal(indice);
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  public openModal(indice) {

    if (indice == null || indice.accion != "D") {
      this.modalRef = this.modalService.open(NuevoSistPensionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        }
      );
      this.modalRef.componentInstance.input_afp = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(ConfirmarNuevoSistPensionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_afp = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }

  }

}
