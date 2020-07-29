import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { ConceptosCuentaComponent } from './pages/conceptos-cuenta/conceptos-cuenta.component';
//componentes


const contabilidadRoutes: Routes = [

  { path: 'conceptoscuentas', component: ConceptosCuentaComponent, data: { titulo: 'Conceptos y cuentas', icono:'mdi mdi-account-box' },  canActivate: [ LoginGuardGuard ] },
];



export const CONTABILIDAD_ROUTES = RouterModule.forChild( contabilidadRoutes );
