import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../modulos/administracion/services/usuarios/usuario.service';


import {
  SidebarService,
  HeaderService,
  LoginGuardGuard,
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    HeaderService,
    UsuarioService,
    LoginGuardGuard,
    
  ],
  declarations: []
})
export class ServiceModule { }
