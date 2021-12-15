import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'find-email-pw',
    loadChildren: () => import('./find-email-pw/find-email-pw.module').then( m => m.FindEmailPwPageModule)
  },
  {
    path: 'res',
    loadChildren: () => import('./res/res.module').then( m => m.ResPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
