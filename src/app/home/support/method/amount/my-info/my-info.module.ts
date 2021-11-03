import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyInfoPageRoutingModule } from './my-info-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { MyInfoPage } from './my-info.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyInfoPageRoutingModule],
  declarations: [MyInfoPage, HeaderComponent],
})
export class MyInfoPageModule {}
