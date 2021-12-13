import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    const container3 = document.querySelector('.container3');
    const container4 = document.querySelector('.container4');
    const container5 = document.querySelector('.container5');
    const db = firebase.firestore();
    const getdb = db.collection('admin').doc('participation');
    getdb.get().then((doc) => {
      if (doc.exists) {
        const a = doc.data().video1;
        const b = doc.data().video2;
        const c = doc.data().video3;
        let templeta3 = a;
        let templeta4 = b;
        let templeta5 = c;
        container3.innerHTML = templeta3;
        container4.innerHTML = templeta4;
        container5.innerHTML = templeta5;
      }
    });
  }

  async moveToMethod() {
    this.router.navigate(['home', 'support', 'method']);
  }
}
