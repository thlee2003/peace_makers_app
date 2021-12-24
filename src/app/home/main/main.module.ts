import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { PeacemakerTrainingComponent } from 'src/app/components/peacemaker-training/peacemaker-training.component';
import { StudentUnificationComponent } from 'src/app/components/student-unification/student-unification.component';
import { CitizenUnificationComponent } from 'src/app/components/citizen-unification/citizen-unification.component';

import { MainPage } from './main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    SwiperModule,
  ],
  declarations: [
    MainPage,
    FooterComponent,
    HeaderComponent,
    PeacemakerTrainingComponent,
    StudentUnificationComponent,
    CitizenUnificationComponent,
  ],
  entryComponents: [
    PeacemakerTrainingComponent,
    StudentUnificationComponent,
    CitizenUnificationComponent,
  ],
})
export class MainPageModule {}
