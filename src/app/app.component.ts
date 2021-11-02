import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Platform,
  ToastController,
  IonRouterOutlet,
  AlertController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common/';

import firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  constructor(
    private location: Location,
    private platform: Platform,
    private router: Router,
    private alertController: AlertController
  ) {
    platform.ready().then(() => {
      this.backButtonEvent();
    });
  }
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.backButtonAlert();
      } else {
        this.location.back();
      }
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
  ngOnInit() {}
}

const firebaseConfig = {
  apiKey: "AIzaSyA49tnwn4Y8ca7EY_7pO2mPAuVGH01l2gI",
  authDomain: "peace-makers-f2530.firebaseapp.com",
  projectId: "peace-makers-f2530",
  storageBucket: "peace-makers-f2530.appspot.com",
  messagingSenderId: "23931604864",
  appId: "1:23931604864:web:3a1f1e00c4d4ceb93d3b65",
  measurementId: "G-6NB8HN8CMT"
};

firebase.initializeApp(firebaseConfig);
