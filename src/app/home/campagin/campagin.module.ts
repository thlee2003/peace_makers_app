import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { CampaginPageRoutingModule } from './campagin-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { CampaginPage } from './campagin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaginPageRoutingModule,
    SwiperModule,
  ],
  declarations: [CampaginPage, HeaderComponent, FooterComponent],
})
export class CampaginPageModule {}
