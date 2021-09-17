import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPagePage } from './my-page.page';

const routes: Routes = [
  {
    path: '',
    component: MyPagePage
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modify-info',
    loadChildren: () => import('./modify-info/modify-info.module').then( m => m.ModifyInfoPageModule)
  },
  {
    path: 'payment-info',
    loadChildren: () => import('./payment-info/payment-info.module').then( m => m.PaymentInfoPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPagePageRoutingModule {}
