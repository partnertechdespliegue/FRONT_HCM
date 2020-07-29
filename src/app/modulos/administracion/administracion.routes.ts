import { Routes, RouterModule } from '@angular/router';
import { GestionUsuariosComponent } from './pages/usuarios/gestion-usuario.component';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';


const administracionRoutes: Routes = [
{path:'gestionusuarios',component:GestionUsuariosComponent,data: { titulo: 'Gestion Usuarios', icono:'mdi mdi-shield' }, canActivate: [ LoginGuardGuard ]},
];



export const ADMINISTRACION_ROUTES = RouterModule.forChild( administracionRoutes );