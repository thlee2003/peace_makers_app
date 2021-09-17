import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindEmailPageRoutingModule } from './find-email-routing.module';

import { FindEmailPage } from './find-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindEmailPageRoutingModule
  ],
  declarations: [FindEmailPage]
})
export class FindEmailPageModule {}
