import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsPageRoutingModule } from './terms-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { TermsPage } from './terms.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TermsPageRoutingModule],
  declarations: [TermsPage, HeaderComponent],
})
export class TermsPageModule {}
