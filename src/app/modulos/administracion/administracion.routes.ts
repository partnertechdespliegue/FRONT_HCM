import { Routes, RouterModule } from '@angular/router';
import { GestionUsuariosComponent } from './pages/usuarios/gestion-usuario.component';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionPaginasComponent } from './pages/paginas/gestion-paginas.component';


const administracionRoutes: Routes = [
{path:'gestionusuarios',component:GestionUsuariosComponent,data: { titulo: 'Gestion Usuarios', icono:'mdi mdi-shield' }, canActivate: [ LoginGuardGuard ]},
{path:'gestionpaginas',component:GestionPaginasComponent,data: { titulo: 'Gestion Paginas', icono:'mdi mdi-book-open-page-variant' }, canActivate: [ LoginGuardGuard ]},
];



export const ADMINISTRACION_ROUTES = RouterModule.forChild( administracionRoutes );
