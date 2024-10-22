import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PageRoutingModule } from './page-routing.module';
import { PrnIssueComponent } from './prn-issue/prn-issue.component';


@NgModule({
  declarations: [
    PrnIssueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PageRoutingModule
  ]
})
export class PageModule { }
