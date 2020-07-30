import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionEquipoComponent } from './pages/gestion-equipo/gestion-equipo.component';
//componentes


const equipoRoutes: Routes = [

  { path: 'equipo', component: GestionEquipoComponent, data: { titulo: 'Gestión equipo', icono:'mdi mdi-account-search' },  canActivate: [ LoginGuardGuard ] },
];



export const EQUIPO_ROUTES = RouterModule.forChild( equipoRoutes );
