import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario.model";
import Swal from "sweetalert2";
import Constantes from "../models/Constantes";
import { UsuarioService } from "../modulos/administracion/services/usuarios/usuario.service";
import { Empresa } from "../models/Empresa";

const publicIp = require("public-ip");

declare function init_plugins();
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  token: any;
  error: string;
  loadRegister: boolean;
  ipPublica: string;

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.token = localStorage.getItem("token");
    this.loadRegister = false;
    (async () => {
      this.ipPublica = await publicIp.v4();
    })();
    if (this.token) {
      this.router.navigate(["/inicio"]);
    }
  }

  login() {
    this._usuarioService.login(this.usuario).subscribe(
      (data: any) => {
        if (data.id_perfil == 1 || data.id_perfil == 2 || data.id_perfil == 4 || data.id_perfil == 5) {
          localStorage.setItem("InfoToken", JSON.stringify(data));
          this.router.navigate(["/inicio"]);
          this.tipoPerfil(data);
        } else {
          Swal.fire(Constantes.INFO, "Usted no tiene permiso para acceder a la aplicación web, intente ingresar a la aplicación móvil", "info");
        }
      },
      (err) => {
        if (err.status == 400) {
          Swal.fire(Constantes.ERROR, err.error.Descripcion_del_error, "error");
        }
      }
    );
  }

  tipoPerfil(data) {
    if (data.id_perfil != 1 || data.empresa != null) {
      localStorage.setItem("objEmpresaSeleccion", JSON.stringify(data.empresa));
      if (data.id_perfil == 2) {
        this.asociarHuellero(data.empresa);
      }
    }
  }

  asociarHuellero(empresa: Empresa) {
    empresa.ruc = this.ipPublica;
    this._usuarioService.asignarHuellero(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success");
      }
    });
  }
}
