import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ADMINISTRACION_ROUTES } from './administracion.routes';
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { GestionUsuariosComponent } from './pages/usuarios/gestion-usuario.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms';

import { NuevoUsuarioComponent } from './pages/usuarios/modals/nuevo-usuario/nuevo-usuario.component';
import { UsuarioService } from './services/usuarios/usuario.service';
import { NuevoUsuarioConfirmarComponent } from './pages/usuarios/modals/nuevo-usuario-confirmar/nuevo-usuario-confirmar.component';
import { RolService } from './services/roles/roles.service';
import { NuevoPasswordComponent } from './pages/usuarios/modals/nuevo-password/nuevo-password.component';
import { NuevoPasswordConfirmarComponent } from './pages/usuarios/modals/nuevo-password-confirmar/nuevo-password-confirmar.component';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GlobalInterceptor } from '../../global.interceptor';


@NgModule({
    imports:[
        CommonModule,
        ADMINISTRACION_ROUTES,
        SharedModule,
        NgbModule,
        FormsModule,
        NgSelectModule,
        TimePickerModule
    ],
    declarations:[
        GestionUsuariosComponent,
        NuevoUsuarioComponent,
        NuevoUsuarioConfirmarComponent,
        NuevoPasswordComponent,
        NuevoPasswordConfirmarComponent
    ],
    entryComponents:[
        NuevoUsuarioComponent,
        NuevoUsuarioConfirmarComponent,
        NuevoPasswordComponent,
        NuevoPasswordConfirmarComponent
    ],
    providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalInterceptor,
            multi: true,
          },
          DatePipe,
          UsuarioService,
          RolService
    ]
})
export class AdministracionModule{ }