import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthCardPageRoutingModule } from './auth-card-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { AuthCardPage } from './auth-card.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthCardPageRoutingModule],
  declarations: [AuthCardPage, HeaderComponent],
})
export class AuthCardPageModule {}
