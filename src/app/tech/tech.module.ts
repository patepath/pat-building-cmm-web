import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { TechRoutingModule } from './tech-routing.module';
import { TodayIssueComponent } from './today-issue/today-issue.component';
import { ProceedingIssueComponent } from './proceeding-issue/proceeding-issue.component';
import { CompletedIssueComponent } from './completed-issue/completed-issue.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { WaitForCloseComponent } from './wait-for-close/wait-for-close.component';

@NgModule({
  declarations: [
    TodayIssueComponent,
    ProceedingIssueComponent,
    CompletedIssueComponent,
    EditIssueComponent,
    WaitForCloseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TechRoutingModule
  ]
})
export class TechModule { }
