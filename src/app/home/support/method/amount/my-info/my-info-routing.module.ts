import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyInfoPage } from './my-info.page';

const routes: Routes = [
  {
    path: '',
    component: MyInfoPage
  },
  {
    path: 'consent',
    loadChildren: () => import('./consent/consent.module').then( m => m.ConsentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyInfoPageRoutingModule {}
