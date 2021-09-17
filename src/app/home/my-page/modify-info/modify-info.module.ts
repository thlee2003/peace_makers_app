import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyInfoPageRoutingModule } from './modify-info-routing.module';

import { ModifyInfoPage } from './modify-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyInfoPageRoutingModule
  ],
  declarations: [ModifyInfoPage]
})
export class ModifyInfoPageModule {}
