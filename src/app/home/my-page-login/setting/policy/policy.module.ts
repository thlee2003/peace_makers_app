import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { PolicyPage } from './policy.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PolicyPageRoutingModule],
  declarations: [PolicyPage, HeaderComponent],
})
export class PolicyPageModule {}
