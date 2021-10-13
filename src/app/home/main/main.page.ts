import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import firebase from 'firebase';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay
} from "swiper";
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 50,
    pagination: true
  }

  peace1: string;
  peacetext1: string;
  peace2: string;
  peacetext2: string;
  peace3: string;
  peacetext3: string;


  constructor(
  ) {}

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async ngOnInit() {
    //firestore에서 해당 db 가져오기(실시간으로)
    var db = firebase.firestore();
    db.collection("admin").doc("mainpage")
      .onSnapshot((doc) => {
        this.peace1 = doc.data().text1;
        this.peacetext1 = doc.data().text2;
        this.peace2 = doc.data().text3;
        this.peacetext2 = doc.data().text4;
        this.peace3 = doc.data().text5;
        this.peacetext3 = doc.data().text6;
      });
  }

}