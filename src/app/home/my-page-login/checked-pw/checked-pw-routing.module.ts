import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckedPwPage } from './checked-pw.page';

const routes: Routes = [
  {
    path: '',
    component: CheckedPwPage,
  },
  {
    path: 'modify-info',
    loadChildren: () =>
      import('./modify-info/modify-info.module').then(
        (m) => m.ModifyInfoPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckedPwPageRoutingModule {}
