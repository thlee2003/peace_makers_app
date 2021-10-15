import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindEmailPwPage } from './find-email-pw.page';

const routes: Routes = [
  {
    path: '',
    component: FindEmailPwPage,
  },  {
    path: 'new-pw',
    loadChildren: () => import('./new-pw/new-pw.module').then( m => m.NewPwPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindEmailPwPageRoutingModule {}
