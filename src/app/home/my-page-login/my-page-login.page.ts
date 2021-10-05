import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase';

@Component({
  selector: 'app-my-page-login',
  templateUrl: './my-page-login.page.html',
  styleUrls: ['./my-page-login.page.scss'],
})
export class MyPageLoginPage implements OnInit {
  name: string;
  points: number = 0;

  constructor(private router: Router) {}

  async ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection('peace_makers').doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.name = doc.data().userName;
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      } else {
        // User is signed out
        // ...
      }
    });
  }

  moveToModifiy_info() {
    this.router.navigate(['home', 'my-page-login', 'checked-pw']);
  }

  moveToPayment_info() {
    this.router.navigate(['home', 'my-page-login', 'payment-info']);
  }

  moveToSetting() {
    this.router.navigate(['home', 'my-page-login', 'setting']);
  }
}
