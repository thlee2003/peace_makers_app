import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-my-page-login',
  templateUrl: './my-page-login.page.html',
  styleUrls: ['./my-page-login.page.scss'],
})
export class MyPageLoginPage implements OnInit {
  name: string;
  points: number = 0;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    //현재 로그인한 사용자 정보 가져오기
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection('peace_makers').doc(user.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
              // 이름은 사용자 이름
              this.name = doc.data().userName;
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      } else {
        // User is signed out
        // ...
      }
    });
  }

  //인증카드
  moveToAuth() {
    this.router.navigate(['home', 'my-page-login', 'auth-card']);
  }

  //기본정보 수정하기
  moveToModifiy_info() {
    this.router.navigate(['home', 'my-page-login', 'checked-pw']);
  }

  //결제정보 확인하기
  moveToPayment_info() {

    alert("준비 중인 기능입니다.")
    // this.router.navigate(['home', 'my-page-login', 'payment-info']);
  }

  //설정 페이지로 이동
  moveToSetting() {
    this.router.navigate(['home', 'my-page-login', 'setting']);
  }
}
