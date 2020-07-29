import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { HttpModule } from '@angular/http';
import { FormsModule,  } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
// import { CountdownModule } from 'ngx-countdown';
import { Ng2SmartTableModule } from 'ng2-smart-table';




@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        NgSelectModule,
        NgbModule,
        BsDatepickerModule,
        DatePickerModule,
        // HttpModule,
        FormsModule,
        // CountdownModule,
        Ng2SmartTableModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    providers: [
      NgbActiveModal,
      
    ],
    entryComponents: [
    ]
})
export class SharedModule { }
