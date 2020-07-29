import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import Constantes from '../../models/Constantes';
import Swal from 'sweetalert2';

declare function init_plugins();
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',

})
export class InicioComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  token: any;
  lsmenu: any[] = [];

  ngOnInit() {
    init_plugins();
    this.token = JSON.parse(localStorage.getItem("InfoToken")) || '';
    this.cargaPaginasPorModulo();
    this.refrescarToken();
  }

  cargaPaginasPorModulo() {
    var perfil = {
      "idPerfil": this.token.id_perfil
    }
    this.usuarioService.cargarPaginasPerfil(perfil).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsmenu = resp.aaData;
        for (let index = 0; index < this.lsmenu.length; index++) {
          this.lsmenu[index].open = false;
        }
      }
    });
  }

  refrescarToken() {
    this.usuarioService.refreshToken().subscribe((resp: any) => {
      localStorage.setItem('InfoToken', JSON.stringify(resp));
    })
  }

}
