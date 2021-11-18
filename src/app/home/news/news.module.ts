import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { NewsPage } from './news.page';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NewsPageRoutingModule],
  declarations: [NewsPage, HeaderComponent, FooterComponent, ModalComponent],
  entryComponents: [ModalComponent],
})
export class NewsPageModule {}
