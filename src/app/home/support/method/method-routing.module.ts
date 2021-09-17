import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MethodPage } from './method.page';

const routes: Routes = [
  {
    path: '',
    component: MethodPage
  },
  {
    path: 'amount',
    loadChildren: () => import('./amount/amount.module').then( m => m.AmountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MethodPageRoutingModule {}
