import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async moveToLogout() {
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
  }

  async moveToDelete() {
    const user = firebase.auth().currentUser;
    var db = firebase.firestore();

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
  }
}
