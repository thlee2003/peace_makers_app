import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowEmailPageRoutingModule } from './show-email-routing.module';

import { ShowEmailPage } from './show-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowEmailPageRoutingModule
  ],
  declarations: [ShowEmailPage]
})
export class ShowEmailPageModule {}
