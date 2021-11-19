import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Platform,
  ToastController,
  IonRouterOutlet,
  AlertController,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common/';

import firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { async } from '@angular/core/testing';

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
  ) {}

  async ngOnInit() {}

  // initializeApp() {
  //   this.platform.ready().then(() => {

  //     this.platform.backButton.subscribeWithPriority(0, async() => {
  //       if(this.routerOutlet && this.routerOutlet.canGoBack()) {
  //         this.routerOutlet.pop();
  //       } else if (this.router.url === 'src/home/main' ) {
  //         const alert = await this.alertController.create({
  //           header: "앱 종료",
  //           message: "앱 종료를 원하시나요?",
  //           buttons: [
  //             {
  //               text: "Cancel",
  //               role: "cancel"
  //             },
  //             {
  //               text: "Close App",
  //               handler: () => {
  //                 navigator["app"].exitApp();
  //               }
  //             }
  //           ]
  //         });
  //         await alert.present();
  //       }
}

const firebaseConfig = {
  apiKey: 'AIzaSyA49tnwn4Y8ca7EY_7pO2mPAuVGH01l2gI',
  authDomain: 'peace-makers-f2530.firebaseapp.com',
  projectId: 'peace-makers-f2530',
  storageBucket: 'peace-makers-f2530.appspot.com',
  messagingSenderId: '23931604864',
  appId: '1:23931604864:web:3a1f1e00c4d4ceb93d3b65',
  measurementId: 'G-6NB8HN8CMT',
};

firebase.initializeApp(firebaseConfig);
