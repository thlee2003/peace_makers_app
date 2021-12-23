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
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

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

  campaigntext1: string;
  campaigntext2: string;

  Q1: string;
  Q2: string;
  Q3: string;

  A1: string;
  A2: string;
  A3: string;

  image1;

  constructor(private platform: Platform, private router: Router) {}

  async ngOnInit() {
    //유튜브 영상 가져오기 + DB 연동
    const container1 = document.querySelector('.container1');
    const container2 = document.querySelector('.container2');
    const db = firebase.firestore();
    const storage = firebase.storage().ref();
    const docRof = db.collection('admin').doc('campaign');
    docRof.get().then((doc) => {
      if (doc.exists) {
        const video1 = doc.data().video1;
        const video2 = doc.data().video2;
        this.campaigntext1 = doc.data().campaign1;
        this.campaigntext2 = doc.data().campaign2;
        this.Q1 = doc.data().Q1text;
        this.A1 = doc.data().A1text;
        this.Q2 = doc.data().Q2text;
        this.A2 = doc.data().A2text;
        this.Q3 = doc.data().Q3text;
        this.A3 = doc.data().A3text;
        let template1 = video1;
        let template2 = video2;
        container1.innerHTML = template1;
        container2.innerHTML = template2;
        this.image1 = this.image1 = storage.child('campagin/'+doc.data().images).getDownloadURL().then(function(url) {
          console.log(url)
        })
      }
    });
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
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
