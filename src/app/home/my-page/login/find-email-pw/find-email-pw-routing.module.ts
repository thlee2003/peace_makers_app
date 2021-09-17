import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindEmailPwPage } from './find-email-pw.page';

const routes: Routes = [
  {
    path: '',
    component: FindEmailPwPage
  },
  {
    path: 'find-email',
    loadChildren: () => import('./find-email/find-email.module').then( m => m.FindEmailPageModule)
  },
  {
    path: 'show-email',
    loadChildren: () => import('./find-email/show-email/show-email.module').then( m => m.ShowEmailPageModule)
  },
  {
    path: 'find-pw',
    loadChildren: () => import('./find-pw/find-pw.module').then( m => m.FindPwPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindEmailPwPageRoutingModule {}
