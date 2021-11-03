import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportPageRoutingModule } from './support-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { SupportPage } from './support.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SupportPageRoutingModule],
  declarations: [SupportPage, HeaderComponent, FooterComponent],
})
export class SupportPageModule {}
