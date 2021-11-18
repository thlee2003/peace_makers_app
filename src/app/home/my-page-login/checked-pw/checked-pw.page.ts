import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-checked-pw',
  templateUrl: './checked-pw.page.html',
  styleUrls: ['./checked-pw.page.scss'],
})
export class CheckedPwPage implements OnInit {
  PwToggleIcon = 'eye-outline';
  showPw: boolean = false;
  isDisabled: boolean = false;

  pw: string;
  error_msg: string;
  uid: string;
  navigationExtras: NavigationExtras = {};

  constructor(private router: Router) {}

  async ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.uid = user.uid;
      }
    });
  }

  togglepw() {
    this.showPw = !this.showPw;
    this.PwToggleIcon = this.showPw ? 'eye-off-outline' : 'eye-outline';
  }

  async moveToinfo() {
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
                if (
                  doc.data().userCompany_num == null &&
                  doc.data().userCompany == null &&
                  doc.data().userInstitution == null
                ) {
                  this.navigationExtras = {
                    state: {
                      a: 'personal',
                    },
                  };
                } else if (
                  doc.data().userCompany_num !== null &&
                  doc.data().userCompany !== null &&
                  doc.data().userInstitution == null
                ) {
                  this.navigationExtras = {
                    state: {
                      a: 'company',
                    },
                  };
                } else if (
                  doc.data().userInstitution !== null &&
                  doc.data().userCompany_num == null &&
                  doc.data().userCompany == null
                ) {
                  this.navigationExtras = {
                    state: {
                      a: 'institution',
                    },
                  };
                }
                this.error_msg = '';
                this.pw = '';
                this.router.navigate(
                  ['home', 'my-page-login', 'checked-pw', 'modify-info'],
                  this.navigationExtras
                );
              } else {
                this.error_msg = '비밀번호가 틀렸습니다.';
              }
            }
          });
        });
    }
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
