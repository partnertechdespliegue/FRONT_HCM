import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { TrabajadorComponent } from './modulos/trabajador/trabajador.component';
import { PlanillasComponent } from './modulos/planillas/planillas.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { InicioComponent } from './shared/Inicio/inicio.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    {path: 'inicio',component: InicioComponent, data: { titulo: 'Inicio', icono: 'mdi mdi-home' }},
    {path: '', redirectTo:'/login',pathMatch:'full'},
    {
        path: '',
        component: TrabajadorComponent,
        loadChildren: './modulos/trabajador/trabajador.module#TrabajadorModule'
    },
    {
        path: '',
        component: PlanillasComponent,
        loadChildren: './modulos/planillas/planillas.module#PlanillasModule'
    },
    {
        path: '',
        component: ConfiguracionComponent,
        loadChildren: './modulos/configuracion/configuracion.module#ConfiguracionModule'
    },
    {
        path: '',
        component: AdministracionComponent,
        loadChildren: './modulos/administracion/administracion.module#AdministracionModule'
    },
    {
      path: '',
      component: ContabilidadComponent,
      loadChildren: './modulos/contabilidad/contabilidad.module#ContabilidadModule'
  },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
