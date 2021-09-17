import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  onClick() {
    console.log('a')
  }

  ngOnInit() {
  }

}
