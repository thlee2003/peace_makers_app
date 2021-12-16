import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, NavController } from '@ionic/angular';
import { Platform, AlertController } from '@ionic/angular';
import firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectTab: any;
  @ViewChild('tabs') homes: IonTabs;

  page = 'login';
  pages: string;

  constructor(
    private router: Router,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      this.backButtonEvent();
    });
  }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.page = 'my-page-login';
        this.pages = 'my-page-login';
      } else {
        this.page = 'login';
        this.pages = 'login';
      }
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      // alert(this.router.url);
      if (this.router.url === '/home/main') {
        this.backButtonAlert();
      } else if (
        this.router.url === '/home/compagin' ||
        this.router.url === '/home/news' ||
        this.router.url === '/home/support' ||
        this.router.url === '/home/login' ||
        this.router.url === '/home/my-page-login'
      ) {
        this.router.navigate(['home', 'main']);
      } else {
        history.back();
      }
    });
  }

  async backButtonAlert() {
    const alert = await this.alertCtrl.create({
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

  setCurrentTab(event) {
    console.log(this.homes.getSelected());
    this.selectTab = this.homes.getSelected();
  }

  clickTab1() {
    this.router.navigateByUrl('/home/support');
  }

  clickTab2() {
    this.router.navigateByUrl('/home/' + this.page);
  }
}
