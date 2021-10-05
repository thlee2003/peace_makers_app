import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  constructor(private router: Router, private alertCtrl: AlertController) {}

  moveToMethod() {
    // 로그인 유무 확인
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.router.navigate(['home', 'support', 'method']);
      } else {
        this.alertCtrl
          .create({
            header: '로그인 후에 가능합니다.',
            buttons: [
              {
                text: '확인',
                handler: (res) => {
                  this.router.navigate(['home', 'my-page', 'login']);
                },
              },
            ],
          })
          .then((res) => res.present());
      }
    });
  }

  async ngOnInit() {
    const container3 = document.querySelector('.container3');
    const container4 = document.querySelector('.container4');
    const container5 = document.querySelector('.container5');
    const db = firebase.firestore();
    const getdb = db.collection('admin').doc('participation');
    getdb.get().then((doc) => {
      if (doc.exists) {
        const a = doc.data().video3;
        const b = doc.data().video4;
        const c = doc.data().video5;
        let templeta3 = a;
        let templeta4 = b;
        let templeta5 = c;
        container3.innerHTML = templeta3;
        container4.innerHTML = templeta4;
        container5.innerHTML = templeta5;
      }
    });
  }
}
