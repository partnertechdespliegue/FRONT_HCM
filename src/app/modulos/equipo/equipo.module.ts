import { NgModule } from '@angular/core';
import { EQUIPO_ROUTES } from './equipo.routes';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { TreeTableModule } from 'ng-treetable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { GestionEquipoService } from './services/gestion-equipo/gestion-equipo.service';
import { GestionEquipoComponent } from './pages/gestion-equipo/gestion-equipo.component';
import { NuevaSolicitudComponent } from './pages/gestion-equipo/modals/nueva-solicitud/nueva-solicitud.component';
import { ConfirmarNuevaSolicitudComponent } from './pages/gestion-equipo/modals/confirmar-nueva-solicitud/confirmar-nueva-solicitud.component';

@NgModule({
  imports: [
    CommonModule,
    EQUIPO_ROUTES,
    SharedModule,
    PaginationModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FormsModule,
    PipesModule,
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule,
    EditorModule,
    NgSelectModule,
    FilterPipeModule,
    BsDatepickerModule,
    DatePickerModule,
    TimePickerModule
  ],
  declarations: [
    GestionEquipoComponent,
    NuevaSolicitudComponent,
    ConfirmarNuevaSolicitudComponent],
  entryComponents: [
    NuevaSolicitudComponent,
    ConfirmarNuevaSolicitudComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
    UsuarioService,
    GestionEquipoService
  ],
})
export class EquipoModule { }
