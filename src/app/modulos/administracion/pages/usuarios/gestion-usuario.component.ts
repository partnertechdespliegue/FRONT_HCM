import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUsuarioComponent } from './modals/nuevo-usuario/nuevo-usuario.component';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { NuevoPasswordComponent } from './modals/nuevo-password/nuevo-password.component';
import Constantes from '../../../../models/Constantes';



@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styles: []
})
export class GestionUsuariosComponent implements OnInit, OnDestroy {

  lsUsuarios = [];
  modalRef: NgbModalRef;
  constructor(
    public modalService: NgbModal,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarUsuarios() {
    this._usuarioService.listarUsuarios().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsUsuarios = resp.aaData;
      }
    })
  }

  nuevoUsuario() {
    let indice = null;
    this.openModal(indice);
  }

  public actualizarUsuario(user) {
    var tmp = Object.assign({}, user);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  public actualizarContra(user) {
    this.modalRef = this.modalService.open(NuevoPasswordComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_usuario = user;
  }

  public openModal(indice) {

    this.modalRef = this.modalService.open(NuevoUsuarioComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_usuario_final = indice;
  }
}
