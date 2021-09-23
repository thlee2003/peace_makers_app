import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  selectTab: any;
  @ViewChild('tabs') homes: IonTabs;

  page = "my-page"

  constructor() {}

  setCurrentTab(event) {
    this.selectTab = this.homes.getSelected();
  }

  async ngOnInit() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          this.page = "my-page-login"
        } else {
          this.page = "my-page"
        }   
      });
  }

}
