import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrnIssueComponent } from './prn-issue/prn-issue.component';

const routes: Routes = [
  { path: 'prn-issue', component: PrnIssueComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
