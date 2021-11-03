import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPageLoginPageRoutingModule } from './my-page-login-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { MyPageLoginPage } from './my-page-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPageLoginPageRoutingModule,
  ],
  declarations: [MyPageLoginPage, HeaderComponent],
})
export class MyPageLoginPageModule {}
