import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, NavController } from '@ionic/angular';
import firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectTab: any;
  @ViewChild('tabs') homes: IonTabs;

  page = 'my-page';
  pages: string;

  constructor(private router: Router) {}

  setCurrentTab(event) {
    console.log(this.homes.getSelected());
    this.selectTab = this.homes.getSelected();
  }

  onClick() {
    alert('준비 중인 기능입니다.');
  }

  clickTab1() {
    this.router.navigateByUrl('/home/support');
  }

  clickTab2() {
    this.router.navigateByUrl('/home/' + this.page);
  }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.page = 'my-page-login';
        this.pages = 'my-page-login';
      } else {
        this.page = 'my-page/login';
        this.pages = 'my-page';
      }
    });
  }
}
