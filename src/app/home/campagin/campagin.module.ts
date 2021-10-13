import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { CampaginPageRoutingModule } from './campagin-routing.module';

import { CampaginPage } from './campagin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaginPageRoutingModule,
    SwiperModule,
  ],
  declarations: [CampaginPage],
})
export class CampaginPageModule {}
