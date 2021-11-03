import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindEmailPwPageRoutingModule } from './find-email-pw-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { FindEmailPwPage } from './find-email-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindEmailPwPageRoutingModule,
  ],
  declarations: [FindEmailPwPage, HeaderComponent],
})
export class FindEmailPwPageModule {}
