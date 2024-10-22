import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { AdminProceedingComponent } from './admin-proceeding/admin-proceeding.component';
import { AdminCompletedComponent } from './admin-completed/admin-completed.component';
import { AdminTodayComponent } from './admin-today/admin-today.component';
import { AdminCancelledComponent } from './admin-cancelled/admin-cancelled.component';
import { AdminWaitForCloseComponent } from './admin-wait-for-close/admin-wait-for-close.component';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report4Component } from './report4/report4.component';
import { Report5Component } from './report5/report5.component';

@NgModule({
  declarations: [
    AdminProceedingComponent,
    AdminCompletedComponent,
    AdminTodayComponent,
    AdminCancelledComponent,
    AdminWaitForCloseComponent,
    Report1Component,
    Report2Component,
    Report3Component,
    Report4Component,
    Report5Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
