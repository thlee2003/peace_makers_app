import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { SettingPage } from './setting.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingPageRoutingModule],
  declarations: [SettingPage, HeaderComponent],
})
export class SettingPageModule {}
