import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
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

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainPage implements OnInit, AfterContentChecked {
  public get alertController(): AlertController {
    return this._alertController;
  }
  public set alertController(value: AlertController) {
    this._alertController = value;
  }
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1.4,
    spaceBetween: 18,
  };

  peace1: string;
  peacetext1: string;
  peace2: string;
  peacetext2: string;
  peace3: string;
  peacetext3: string;

  constructor(
    private platform: Platform,
    private _alertController: AlertController
  ) {
    platform.ready().then(() => {
      this.backButtonEvent();
    });
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async ngOnInit() {
    //firestore에서 해당 db 가져오기
    const db = firebase.firestore();
    const docRef = db.collection('admin').doc('mainpage');

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.peacetext1 = doc.data().text1;
          this.peacetext2 = doc.data().text2;
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.backButtonAlert();
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: '앱을 종료하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'Cancel',
        },
        {
          text: '확인',
          handler: () => {
            navigator['app'].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
}
