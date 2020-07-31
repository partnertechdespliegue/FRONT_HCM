import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { EditarGestionPaginasComponent } from './modals/editar-gestion-paginas/editar-gestion-paginas.component';

@Component({
  selector: 'app-paginas',
  templateUrl: './gestion-paginas.component.html',
  styles: []
})
export class GestionPaginasComponent implements OnInit {

  constructor(
    public modalService: NgbModal,
    public _usuarioService: UsuarioService) { }

  modalRef: NgbModalRef;
  lsPerfile: any[] = [];
  ngOnInit() {
    this.listarPerfil();
  }

  listarPerfil() {
    this._usuarioService.listarPerfil().subscribe((resp: any) => {
      this.lsPerfile = resp.aaData;
    })
  }

  gestionPaginas(perfil) {
    this.modalRef = this.modalService.open(EditarGestionPaginasComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_perfil = perfil;
  }

}
