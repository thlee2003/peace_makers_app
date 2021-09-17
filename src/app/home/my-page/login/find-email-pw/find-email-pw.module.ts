import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindEmailPwPageRoutingModule } from './find-email-pw-routing.module';

import { FindEmailPwPage } from './find-email-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindEmailPwPageRoutingModule
  ],
  declarations: [FindEmailPwPage]
})
export class FindEmailPwPageModule {}
