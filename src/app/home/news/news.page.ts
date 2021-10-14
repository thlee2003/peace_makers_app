import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  constructor(private modalCtrl: ModalController, private iab: InAppBrowser) {}

  onClick() {
    const broser = this.iab.create(
      'https://www.instagram.com/p/CU_bLxevuld/',
      'defaults',
      {
        location: 'no',
      }
    );
    broser.on('loadstart').subscribe((e) => {});
    broser.on('exit').subscribe((e) => {
      broser.close();
    });
  }

  ngOnInit() {}
}
