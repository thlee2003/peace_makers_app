import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}
  moveToTerms() {
    this.router.navigate(['home', 'my-page-login', 'setting', 'terms']);
  }
  moveToPolicy() {
    this.router.navigate(['home', 'my-page-login', 'setting', 'policy']);
  }
  async moveToLogout() {
    this.alertCtrl
      .create({
        header: '로그아웃 하시겠습니까?',
        buttons: [
          {
            text: '취소',
            role: 'cancel',
          },
          {
            text: '로그아웃',
            handler: (res) => {
              const result = firebase
                .auth()
                .signOut()
                .then(() => {
                  this.router.navigate(['home', 'main']);
                })
                .catch((error) => {});
            },
          },
        ],
      })
      .then((res) => res.present());
  }

  async moveToDelete() {
    // 회원탈퇴시 firestore 삭제
    const user = firebase.auth().currentUser;
    var db = firebase.firestore();
    this.alertCtrl
      .create({
        header: '회원탈퇴 하시겠습니까?',
        buttons: [
          {
            text: '취소',
            role: 'cancel',
          },
          {
            text: '회원탈퇴',
            handler: (res) => {
              db.collection('peace_makers')
                .doc(user.uid)
                .delete()
                .then(() => {
                  user
                    .delete()
                    .then(async () => {
                      const toast = await this.toastController.create({
                        message: '회원탈퇴가 정상적으로 처리 되었습니다.',
                        duration: 2000,
                      });
                      toast.present();
                    })
                    .catch((err) => {});
                  this.router.navigate(['home', 'main']);
                })
                .catch((err) => {
                  console.error('Error removing document: ', err);
                });
            },
          },
        ],
      })
      .then((res) => res.present());
  }
}
