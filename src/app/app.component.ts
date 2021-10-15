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
  apiKey: 'AIzaSyDDDT_M70gUkpq7ubOcChoePbU1cy_G5XQ',
  authDomain: 'ngo-platform-9cbdb.firebaseapp.com',
  projectId: 'ngo-platform-9cbdb',
  storageBucket: 'ngo-platform-9cbdb.appspot.com',
  messagingSenderId: '1032461306472',
  appId: '1:1032461306472:web:5c2909e12adf1beac409dd',
  measurementId: 'G-1Q8E5LDVVW',
};

firebase.initializeApp(firebaseConfig);
