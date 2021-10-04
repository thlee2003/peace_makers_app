import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-checked-pw',
  templateUrl: './checked-pw.page.html',
  styleUrls: ['./checked-pw.page.scss'],
})
export class CheckedPwPage implements OnInit {
  pw: string;
  error_msg: string;
  uid: string;

  constructor(private router: Router) {}

  moveToinfo() {
    if (this.pw == undefined || this.pw == '') {
      this.error_msg = '비밀번호를 입력하세요';
    } else {
      const db = firebase.firestore();

      db.collection('peace_makers')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === this.uid) {
              if (this.pw === doc.data().userPW) {
                this.error_msg = '';
                this.pw = '';
                this.router.navigate([
                  'home',
                  'my-page-login',
                  'checked-pw',
                  'modify-info',
                ]);
              } else {
                this.error_msg = '비밀번호가 틀렸습니다.';
              }
            }
          });
        });
    }
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.uid = user.uid;
      }
    });
  }
}
// this.error_msg = '';
//       this.pw = '';
//       this.router.navigate([
//         'home',
//         'my-page-login',
//         'checked-pw',
//         'modify-info',
//       ]);
