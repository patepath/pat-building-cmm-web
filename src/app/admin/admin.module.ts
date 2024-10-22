import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NewIssueComponent } from './new-issue/new-issue.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EditIssueComponent } from './edit-issue/edit-issue.component';


@NgModule({
  declarations: [
    NewIssueComponent,
    EditIssueComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class AdminModule { }
