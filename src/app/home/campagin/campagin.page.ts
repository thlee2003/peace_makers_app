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
  video1: string;
  video2: string;
  outVideo1: string;
  outVideo2: string;
  Q1: string;
  Q2: string;
  Q3: string;
  A1: string;
  A2: string;
  A3: string;
  image = {
    img1: null,
    img2: null,
    img3: null,
    img4: null,
    img5: null,
    img6: null,
    img7: null,
    img8: null,
    img9: null,
  };
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
        this.video1 = doc.data().video1;
        this.outVideo1 =
          'https://www.youtube.com/embed/' + this.video1.split('.be/')[1];
        this.video2 = doc.data().video2;
        this.outVideo2 =
          'https://www.youtube.com/embed/' + this.video2.split('.be/')[1];
        this.campaigntext1 = doc.data().campaign1;
        this.campaigntext2 = doc.data().campaign2;
        this.Q1 = doc.data().Q1text;
        this.A1 = doc.data().A1text;
        this.Q2 = doc.data().Q2text;
        this.A2 = doc.data().A2text;
        this.Q3 = doc.data().Q3text;
        this.A3 = doc.data().A3text;
        storage
          .child('campagin/' + doc.data().images)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.image.img1 = url;
          });
        document.getElementById('video1').innerHTML = `<iframe
              width="100%"
              height="100%"
              src=${this.outVideo1}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>`;
        document.getElementById('video2').innerHTML = `<iframe
              width="100%"
              height="100%"
              src=${this.outVideo2}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>`;
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
