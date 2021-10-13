import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import firebase from 'firebase';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);
@Component({
  selector: 'app-campagin',
  templateUrl: './campagin.page.html',
  styleUrls: ['./campagin.page.scss'],
})
export class CampaginPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 50,
    pagination: true,
  };

  campaign1: string;
  campaigntext1: string;
  campaign2: string;
  campaigntext2: string;

  constructor() {}

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async ngOnInit() {
    const container1 = document.querySelector('.container1');
    const container2 = document.querySelector('.container2');
    const db = firebase.firestore();
    const docRof = db.collection('admin').doc('campaign');
    docRof.get().then((doc) => {
      if (doc.exists) {
        const video1 = doc.data().video1;
        const video2 = doc.data().video2;
        this.campaign1 = doc.data().text1;
        this.campaigntext1 = doc.data().text2;
        this.campaign2 = doc.data().text3;
        this.campaigntext2 = doc.data().text4;
        let template1 = video1;
        let template2 = video2;
        container1.innerHTML = template1;
        container2.innerHTML = template2;
      }
    });
  }

  ionViewDidLoad() {
    alert('chlwhd');
    var acc = document.getElementsByClassName('accordion');
    for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  }
}
