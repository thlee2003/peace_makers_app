import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportPage } from './support.page';

const routes: Routes = [
  {
    path: '',
    component: SupportPage
  },
  {
    path: 'method',
    loadChildren: () => import('./method/method.module').then( m => m.MethodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportPageRoutingModule {}
