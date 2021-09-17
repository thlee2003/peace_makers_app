import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {

  pay: number;
  error_msg: string;

  constructor(private nav: NavController) { }

  moveToMy_info() {

    if (this.pay < 5000 || this.pay == undefined) {
      this.error_msg = "5000원 이상 입력해주세요"
    } else {
      this.nav.navigateForward(['home','support','method','amount','my-info'])  
    }

    // 현재 로그인한 사용자 가져오기
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
  }

  ngOnInit() {
  }

}
