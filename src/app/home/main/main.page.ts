import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

import { PeacemakerTrainingComponent } from 'src/app/components/peacemaker-training/peacemaker-training.component';
import { StudentUnificationComponent } from 'src/app/components/student-unification/student-unification.component';
import { CitizenUnificationComponent } from 'src/app/components/citizen-unification/citizen-unification.component';

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
import { AlertController, Platform, ModalController } from '@ionic/angular';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainPage implements OnInit, AfterContentChecked {
  peace1: string;
  peacetext1: string;
  peace2: string;
  peacetext2: string;
  peace3: string;
  peacetext3: string;

  constructor(
    private _alertController: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

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

  moveToSupport() {
    this.router.navigate(['home', 'support']);
  }

  async moveTostudy1() {
    console.log('a');
    const modal = await this.modalCtrl.create({
      component: PeacemakerTrainingComponent,
    });
    await modal.present();
  }
  async moveTostudy2() {
    console.log('a');
    const modal = await this.modalCtrl.create({
      component: StudentUnificationComponent,
    });
    await modal.present();
  }
  async moveTostudy3() {
    console.log('a');
    const modal = await this.modalCtrl.create({
      component: CitizenUnificationComponent,
    });
    await modal.present();
  }
}
