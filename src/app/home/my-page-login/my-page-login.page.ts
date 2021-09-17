import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-my-page-login',
  templateUrl: './my-page-login.page.html',
  styleUrls: ['./my-page-login.page.scss'],
})
export class MyPageLoginPage implements OnInit {

  name: string;
  points: number = 10000;

  constructor(
    private router: Router,
    private toastController: ToastController,
    ) { }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection("peace_makers").doc(user.uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            this.name =  doc.data().userName
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        // User is signed out
        // ...
      }
    });
  }
  

  async moveToLogout() {
    const result = firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['home','main'])
    }).catch((error) => {
      // An error happened.
    });
    console.log(result)
  }
  moveToModifiy_info() {
    this.router.navigate(['home','my-page','modify-info'])
  }

  moveToPayment_info() {
    this.router.navigate(['home','my-page','payment-info'])
  }


  moveToSetting() {
    this.router.navigate(['home','my-page','setting'])
  }

  async moveToDelete() {
    const user = firebase.auth().currentUser;
    var db = firebase.firestore();

    // 회원탈퇴시 firestore 삭제
    db.collection("peace_makers").doc(user.uid).delete().then(() => {
      //회원탈퇴시 auth 삭제
      user.delete().then(async () => {
        //회원탈퇴 관련 toast
        const toast = await this.toastController.create({
          message: '회원탈퇴가 정상적으로 처리 되었습니다.',
          duration: 2000
        });
        toast.present();
      }).catch((error) => {
      });
      console.log("Document successfully deleted!");
      this.router.navigate(['home','main'])
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}
