import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.page.html',
  styleUrls: ['./auth-card.page.scss'],
})
export class AuthCardPage implements OnInit {

  name: string;
  code: string;
  belong: string;

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
            if(doc.data().userCompany_num == null && doc.data().userCompany == null && doc.data().userInstitution == null ) {
              this.code = "KP1001"
              this.belong = "(개인회원입니다.)"
            }
            else if(doc.data().userCompany_num !== null && doc.data().userCompany !== null && doc.data().userInstitution == null) {
              this.code = "KC1001"
              this.belong = doc.data().userCompany
            }
            else if(doc.data().userInstitution !== null && doc.data().userCompany_num == null && doc.data().userCompany == null) {
              this.code = "KG1001"
              this.belong = doc.data().userInstitution
            }
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
      }
    });
  }
}
