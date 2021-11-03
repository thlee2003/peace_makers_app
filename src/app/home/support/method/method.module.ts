import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MethodPageRoutingModule } from './method-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { MethodPage } from './method.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MethodPageRoutingModule],
  declarations: [MethodPage, HeaderComponent],
})
export class MethodPageModule {}
