import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewIssueComponent } from './new-issue/new-issue.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';

const routes: Routes = [
  { path: 'new-issue', component: NewIssueComponent},
  { path: 'edit-issue', component: EditIssueComponent},
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
