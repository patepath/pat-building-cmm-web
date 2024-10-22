import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminTodayComponent } from './admin-today/admin-today.component';
import { AdminProceedingComponent } from './admin-proceeding/admin-proceeding.component';
import { AdminCompletedComponent } from './admin-completed/admin-completed.component';
import { AdminCancelledComponent } from './admin-cancelled/admin-cancelled.component';
import { AdminWaitForCloseComponent } from './admin-wait-for-close/admin-wait-for-close.component';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report4Component } from './report4/report4.component';
import { Report5Component } from './report5/report5.component';

const routes: Routes = [
  { path: 'admin-today', component: AdminTodayComponent },
  { path: 'admin-proceeding', component: AdminProceedingComponent },
  { path: 'admin-wait-for-close', component: AdminWaitForCloseComponent },
  { path: 'admin-completed', component: AdminCompletedComponent },
  { path: 'admin-cancelled', component: AdminCancelledComponent },
  { path: 'report1', component: Report1Component },
  { path: 'report2', component: Report2Component },
  { path: 'report3', component: Report3Component },
  { path: 'report4', component: Report4Component },
  { path: 'report5', component: Report5Component },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReportRoutingModule { }
