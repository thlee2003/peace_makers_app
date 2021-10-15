import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.page.html',
  styleUrls: ['./auth-card.page.scss'],
})
export class AuthCardPage implements OnInit {

  name: string;

  constructor() { }

  async ngOnInit() {
    //현재 로그인한 사용자 가져오기
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //firestore에서 정보 가져오기
        const db = firebase.firestore();
        const docRef = db.collection('peace_makers').doc(user.uid);
        docRef.get().then((doc) => {
          if (doc.exists) {
            //인증 카드 이름은 사용자 이름
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
}
