import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  {
    path: '',
    children: [
      { path: 'page', loadChildren: () => import('./page/page.module').then(m => m.PageModule) },
    ]
  },
  { path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'tech', loadChildren: () => import('./tech/tech.module').then(m => m.TechModule) },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
