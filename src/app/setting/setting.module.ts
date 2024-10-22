import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './user/user.component';
import { SettingRoutingModule } from './setting-routing.module';
import { EquipmentComponent } from './equipment/equipment.component';
import { PartComponent } from './part/part.component';
import { DepartmentComponent } from './department/department.component';
import { GroupComponent } from './group/group.component';
import { SubgroupComponent } from './subgroup/subgroup.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    UserComponent,
    EquipmentComponent,
    PartComponent,
    DepartmentComponent,
    GroupComponent,
    SubgroupComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SettingModule { }
