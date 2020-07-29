import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';


import { ParametrosComponent } from './pages/parametros/parametros.component';
import { DatosAfpOnpComponent } from './pages/datos-afp-onp/datos-afp-onp.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { CentroCostosComponent } from './pages/centro-costos/centro-costos.component';
import { AnomesComponent } from './pages/anomes/anomes.component';
import { SctrComponent } from './pages/sctr/sctr.component';
import { EpsComponent } from './pages/eps/eps.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { TiposPermisosComponent } from './pages/permisos/permisos.component';
import { RemuneracionesComponent } from './pages/remuneraciones/remuneraciones.component';
import { DescuentosComponent } from './pages/descuentos/descuentos.component';
import { TipoPlanillaComponent } from './pages/tipo-planilla/tipo-planilla.component';
import { DepartamentoEmpresaComponent } from './pages/departamentoEmpresa/departamento-empresa.component';
import { AreaDepartamentoEmpresaComponent } from './pages/area-departamento-empresa/area-departamento-empresa.component';
import { PuestoAreaEmpresaComponent } from './pages/puesto-area-empresa/puesto-area-empresa.component';

//componentes


const configuracionRoutes: Routes = [

    { path: 'parametros', component: ParametrosComponent, data: { titulo: 'Parametros', icono:'mdi mdi-wrench' },  canActivate: [ LoginGuardGuard ] },
    { path: 'afp', component: DatosAfpOnpComponent, data: { titulo: 'AFP', icono:'mdi mdi-hospital' },  canActivate: [ LoginGuardGuard ] },
    { path: 'empresa', component: EmpresaComponent, data: { titulo: 'Empresa', icono:'mdi mdi-factory' },  canActivate: [ LoginGuardGuard ] },
    { path: 'tipoplanilla', component: TipoPlanillaComponent, data: { titulo: 'Tipo Planilla', icono:'mdi mdi-clipboard-account' },  canActivate: [ LoginGuardGuard ] },
    { path: 'centrocostos', component: CentroCostosComponent, data: { titulo: 'Centro Costos', icono:'mdi mdi-archive' },  canActivate: [ LoginGuardGuard ] },
    { path: 'sctr', component: SctrComponent, data:{ titulo: 'Seguro Complementario de Trabajo de Riesgo', icono:'mdi mdi-bell-plus'}, canActivate: [LoginGuardGuard]},
    { path: 'eps', component: EpsComponent, data: {titulo: 'Entidad Prestadora de Salud', icono:'mdi mdi-hospital-building'}, canActivate: [LoginGuardGuard]},
    { path: 'anual', component: AnomesComponent, data: { titulo: 'Año y Mes' , icono:'mdi mdi-calendar-text'},  canActivate: [ LoginGuardGuard ] },
    { path:'horarios',component: HorariosComponent, data: {titulo: 'Horarios', icono:'mdi mdi-calendar-clock'}, canActivate: [ LoginGuardGuard ]},
    { path:'permisos',component:TiposPermisosComponent, data: {titulo: 'Tipos de Permisos', icono:'mdi mdi-wheelchair-accessibility'}, canActivate: [ LoginGuardGuard ]},
    { path:'remuneraciones',component:RemuneracionesComponent, data: {titulo: 'Remuneraciones', icono:'mdi mdi-coin'}, canActivate: [ LoginGuardGuard ]},
    { path:'descuentos',component:DescuentosComponent, data: {titulo: 'Descuentos', icono:'mdi mdi-square-inc-cash'}, canActivate: [ LoginGuardGuard ]},
    { path: 'departamentoempresa', component: DepartamentoEmpresaComponent, data: {titulo: 'Departamento', icono:'mdi mdi-square-inc-cash'}, canActivate: [ LoginGuardGuard ]},
    { path: 'areadepartamentoempresa', component: AreaDepartamentoEmpresaComponent, data: { titulo: 'Area de Departamento', icono: 'mdi mdi-square-inc-cash' }, canActivate: [LoginGuardGuard] },
    { path: 'puestoareaempresa', component: PuestoAreaEmpresaComponent, data: { titulo: 'Puesto de Area', icono: 'fa fa-id-badge' }, canActivate: [LoginGuardGuard] },

    //copiar para compras
];



export const CONFIGURACION_ROUTES = RouterModule.forChild( configuracionRoutes );
