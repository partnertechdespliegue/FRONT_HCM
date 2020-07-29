import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';

import { GestionTrabajadorComponent } from './pages/gestion-trabajador/gestion-trabajador.component';
import { ControlAsistenciaComponent } from './pages/control-asistencia/control-asistencia.component';
import { DerechoHabientesComponent } from './pages/derecho-habientes/derecho-habientes.component';



const trabajadorRoutes: Routes = [
 
    { path: 'gestiontrabajador', component: GestionTrabajadorComponent, data: { titulo: 'Gestion Trabajador', icono: 'mdi mdi-worker' },  canActivate: [ LoginGuardGuard ] },
    { path: 'controlasistencia', component: ControlAsistenciaComponent, data: { titulo: 'Gestion de Asistencias', icono: 'mdi mdi-clock-fast' },  canActivate: [ LoginGuardGuard ] },
    { path: 'derechohabientes', component: DerechoHabientesComponent, data: { titulo: 'Derecho Habientes', icono: 'mdi mdi-heart-box' },  canActivate: [ LoginGuardGuard ] },
];



export const TRABAJADOR_ROUTES = RouterModule.forChild( trabajadorRoutes );
