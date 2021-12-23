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
  newstitle: string;
  newsUrl;
  image1;
  image2;
  image3;
  image4;
  image5;
  image6;
  image7;
  image8;
  image9;

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
          this.newstitle = doc.data().newstitle;
          //url 가져오기
          this.newsUrl = doc.data().newslink;
          console.log(doc.data().images.img1)
          //사진 들고오기 db+storage
          this.image1 = storage.child('main_page/'+doc.data().images.img1).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image2 = storage.child('main_page/'+doc.data().images.img2).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image3 = storage.child('main_page/'+doc.data().images.img3).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image4 = storage.child('main_page/'+doc.data().images.img4).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image5 = storage.child('main_page/'+doc.data().images.img5).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image6 = storage.child('main_page/'+doc.data().images.img6).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image7 = storage.child('main_page/'+doc.data().images.img7).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image8 = storage.child('main_page/'+doc.data().images.img8).getDownloadURL().then(function(url) {
            console.log(url)
          })
          this.image9 = storage.child('main_page/'+doc.data().images.img9).getDownloadURL().then(function(url) {
            console.log(url)
          })
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  moveToSupport() {
    alert("후원금은 현재 계좌로 받고 있습니다.")
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
