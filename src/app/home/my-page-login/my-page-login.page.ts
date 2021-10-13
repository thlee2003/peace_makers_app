import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-my-page-login',
  templateUrl: './my-page-login.page.html',
  styleUrls: ['./my-page-login.page.scss'],
})
export class MyPageLoginPage implements OnInit {
  name: string;
  points: number = 0;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) {}

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

  moveToAuth() {
    this.router.navigate(['home', 'my-page-login', 'auth-card']);
  }

  //로그아웃하기
  async moveToLogout() {
    await this.alertCtrl
      .create({
        header: '로그아웃을 진행하시겠습니까?',
        buttons: [
          {
            text: '네',
            handler: () => {
              const result = firebase
                .auth()
                .signOut()
                .then(() => {
                  // Sign-out successful.
                  this.router.navigate(['home', 'main']);
                })
                .catch((error) => {
                  // An error happened.
                });
              console.log(result);
            },
          },
          {
            text: '아니오',
            handler: () => {
              this.router.navigate(['home', 'my-page-login']);
            },
          },
        ],
      })
      .then((res) => res.present());
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

  async moveToDelete() {
    const user = firebase.auth().currentUser;
    var db = firebase.firestore();

    await this.alertCtrl
      .create({
        header: '회원탈퇴를 진행하시겠습니까?',
        buttons: [
          {
            text: '확인',
            handler: async (res) => {
              // 회원탈퇴시 firestore 삭제
              db.collection('peace_makers')
                .doc(user.uid)
                .delete()
                .then(() => {
                  //회원탈퇴시 auth 삭제
                  user
                    .delete()
                    .then(async () => {
                      //회원탈퇴 관련 toast
                      const toast = await this.toastController.create({
                        message: '회원탈퇴가 정상적으로 처리 되었습니다.',
                        duration: 2000,
                      });
                      toast.present();
                    })
                    .catch((error) => {});
                  console.log('Document successfully deleted!');
                  this.router.navigate(['home', 'main']);
                })
                .catch((error) => {
                  console.error('Error removing document: ', error);
                });
            },
          },
          {
            text: '아니오',
            handler: (res) => {
              this.router.navigate(['home', 'my-page-login']);
            },
          },
        ],
      })
      .then((res) => res.present());
  }
}
