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

  constructor(private router: Router) {}

  setCurrentTab(event) {
    this.selectTab = this.homes.getSelected();
    console.log(this.router.url);
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
      } else {
        this.page = 'my-page';
      }
    });
  }
}
