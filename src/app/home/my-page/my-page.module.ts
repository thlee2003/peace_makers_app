import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPagePageRoutingModule } from './my-page-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { MyPagePage } from './my-page.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyPagePageRoutingModule],
  declarations: [MyPagePage, HeaderComponent, FooterComponent],
})
export class MyPagePageModule {}
