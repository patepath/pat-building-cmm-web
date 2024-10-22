import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { PartComponent } from './part/part.component';
import { DepartmentComponent } from './department/department.component';
import { GroupComponent } from './group/group.component';
import { SubgroupComponent } from './subgroup/subgroup.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'group', component: GroupComponent },
  { path: 'subgroup', component: SubgroupComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'part', component: PartComponent },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule ],
})
export class SettingRoutingModule { }
