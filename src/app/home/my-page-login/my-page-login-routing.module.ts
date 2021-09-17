import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPageLoginPage } from './my-page-login.page';

const routes: Routes = [
  {
    path: '',
    component: MyPageLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageLoginPageRoutingModule {}
