import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import firebase from 'firebase';
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  back_clicked = 0;

//   constructor(
//     private toastCtrl: ToastController,
//     private platform: Platform,
//     private splashScreen: SplashScreen,
//     private statusBar: StatusBar
//   ) {this.initializeApp()}

//   initializeApp() {
//     this.platform.ready().then(() => {
//         this.statusBar.styleDefault();
//         this.splashScreen.hide();
//     });
// }
  
//   ngOnInit() {
//     this.appExitConfig()
//   }

//   private appExitConfig() {
//     this.platform.backButton.subscribe(async () => {
//         if (this.back_clicked === 0) {
//             this.back_clicked++;

//             const toast = await this.toastCtrl.create({
//                 message: '뒤로가기 버튼을 한번 더 누르시면 앱이 종료됩니다.',
//                 duration: 2000
//             });
//             toast.present();

//             setTimeout(() => {
//                 this.back_clicked = 0;
//             }, 2000);
//         } else {
//             navigator['app'].exitApp();
//         }
//     });
// }
}

const firebaseConfig = {
  apiKey: "AIzaSyDDDT_M70gUkpq7ubOcChoePbU1cy_G5XQ",
  authDomain: "ngo-platform-9cbdb.firebaseapp.com",
  projectId: "ngo-platform-9cbdb",
  storageBucket: "ngo-platform-9cbdb.appspot.com",
  messagingSenderId: "1032461306472",
  appId: "1:1032461306472:web:5c2909e12adf1beac409dd",
  measurementId: "G-1Q8E5LDVVW"
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
