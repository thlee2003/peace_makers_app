import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountPage } from './amount.page';

const routes: Routes = [
  {
    path: '',
    component: AmountPage
  },
  {
    path: 'my-info',
    loadChildren: () => import('./my-info/my-info.module').then( m => m.MyInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmountPageRoutingModule {}
