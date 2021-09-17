import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowEmailPage } from './show-email.page';

const routes: Routes = [
  {
    path: '',
    component: ShowEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowEmailPageRoutingModule {}
