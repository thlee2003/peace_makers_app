import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckedPwPageRoutingModule } from './checked-pw-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { CheckedPwPage } from './checked-pw.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CheckedPwPageRoutingModule],
  declarations: [CheckedPwPage, HeaderComponent],
})
export class CheckedPwPageModule {}
