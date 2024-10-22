import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodayIssueComponent } from './today-issue/today-issue.component';
import { ProceedingIssueComponent } from './proceeding-issue/proceeding-issue.component';
import { CompletedIssueComponent } from './completed-issue/completed-issue.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { WaitForCloseComponent } from './wait-for-close/wait-for-close.component';

const routes: Routes = [
  { path: 'today-issue', component: TodayIssueComponent },
  { path: 'proceeding-issue', component: ProceedingIssueComponent },
  { path: 'wait-for-close', component: WaitForCloseComponent },
  { path: 'completed-issue', component: CompletedIssueComponent },
  { path: 'edit-issue', component: EditIssueComponent },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TechRoutingModule { }
