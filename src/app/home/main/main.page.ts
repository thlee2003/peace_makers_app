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
  peacetext1: string;
  peacetext2: string;
  edutitle1: string;
  edutitle2: string;
  edutitle3: string;
  edutext1: string;
  edutext2: string;
  edutext3: string;
  video: string;
  outVideo: string;
  newstitle: string;
  newsUrl: string;
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
    //storage 연결
    const storage = firebase.storage().ref();
    const docRef = db.collection('admin').doc('mainpage');

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          //text 가져오기
          this.peacetext1 = doc.data().maintext1;
          this.peacetext2 = doc.data().maintext2;
          this.edutitle1 = doc.data().edutitle1;
          this.edutitle2 = doc.data().edutitle2;
          this.edutitle3 = doc.data().edutitle3;
          this.edutext1 = doc.data().edutext1;
          this.edutext2 = doc.data().edutext2;
          this.edutext3 = doc.data().edutext3;
          this.video = doc.data().video;
          this.outVideo =
            'https://www.youtube.com/embed/' + this.video.split('.be/')[1];
          this.newstitle = doc.data().newstitle;
          //url 가져오기
          this.newsUrl = doc.data().newslink;
          for (let i = 1; i <= 9; i++) {
            storage
              .child(`main_page/${doc.data().images[`img${i}`]}`)
              .getDownloadURL()
              .then((url) => {
                this.image[`img${i}`] = url;
              });
          }
          document.getElementById('video').innerHTML = `<iframe
              width="100%"
              height="100%"
              src=${this.outVideo}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>`;
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  moveToSupport() {
    console.log(this.outVideo);
    alert('후원금은 현재 계좌로 받고 있습니다.');
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
