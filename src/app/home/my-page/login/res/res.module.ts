import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResPageRoutingModule } from './res-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { ResPage } from './res.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ResPageRoutingModule],
  declarations: [ResPage, HeaderComponent],
})
export class ResPageModule {}
