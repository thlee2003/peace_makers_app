import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPageLoginPage } from './my-page-login.page';

const routes: Routes = [
  {
    path: '',
    component: MyPageLoginPage,
  },
  {
    path: 'payment-info',
    loadChildren: () =>
      import('../my-page-login/payment-info/payment-info.module').then(
        (m) => m.PaymentInfoPageModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('../my-page-login/setting/setting.module').then(
        (m) => m.SettingPageModule
      ),
  },
  {
    path: 'checked-pw',
    loadChildren: () =>
      import('./checked-pw/checked-pw.module').then(
        (m) => m.CheckedPwPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageLoginPageRoutingModule {}
