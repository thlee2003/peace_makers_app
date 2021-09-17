import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindEmailPage } from './find-email.page';

const routes: Routes = [
  {
    path: '',
    component: FindEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindEmailPageRoutingModule {}
