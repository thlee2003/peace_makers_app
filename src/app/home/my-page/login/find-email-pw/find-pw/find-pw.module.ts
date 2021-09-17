import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindPwPageRoutingModule } from './find-pw-routing.module';

import { FindPwPage } from './find-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindPwPageRoutingModule
  ],
  declarations: [FindPwPage]
})
export class FindPwPageModule {}
