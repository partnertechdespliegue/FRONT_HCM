import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GenerarPlanillaComponent } from './pages/generar-planilla/generar-planilla.component';
import { AdelantoSueldoComponent } from './pages/adelanto-sueldo/adelanto-sueldo.component';
import { GestionVacacionesComponent } from './pages/gestion-vacaciones/gestion-vacaciones.component';
//componentes


const planillasRoutes: Routes = [
 
    { path: 'generarplanillas', component: GenerarPlanillaComponent, data: { titulo: 'Generar Planilla', icono:'mdi mdi-newspaper' },  canActivate: [ LoginGuardGuard ] },
    { path: 'adelantosueldo', component: AdelantoSueldoComponent, data: { titulo: 'Adelanto Sueldo', icono:'mdi mdi-cash-multiple' },  canActivate: [ LoginGuardGuard ] },
    { path: 'vacaciones', component: GestionVacacionesComponent, data: { titulo: 'Vacaciones', icono:'mdi mdi-airplane' },  canActivate: [ LoginGuardGuard ] },
    //copiar para compras
];



export const PLANILLAS_ROUTES = RouterModule.forChild( planillasRoutes );
