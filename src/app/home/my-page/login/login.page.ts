import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPw: boolean = false;
  PwToggleIcon = 'eye-outline';
  error_msg: string;
  isDisabled: boolean = false;
  checkmark = 'checkmark-circle-outline';
  private email: string;
  private pw: string;
  uid: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {}

  // 아이콘 변경
  togglepw() {
    this.showPw = !this.showPw;
    this.PwToggleIcon = this.showPw ? 'eye-off-outline' : 'eye-outline';
  }

  togglecheck() {
    this.isDisabled = !this.isDisabled;
    this.checkmark = this.isDisabled
      ? 'checkmark-circle'
      : 'checkmark-circle-outline';
    console.log(this.isDisabled);
  }

  // 로그인 구현
  moveToMain() {
    if (this.email == undefined || this.email == '') {
      this.error_msg = '이메일을 입력하세요.';
    } else if (this.pw == undefined || this.pw == '') {
      this.error_msg = '비밀번호를 입력하세요.';
    } else {
      this.error_msg = ''
      // 로그인
      firebase.auth().languageCode = 'ko';
      firebase.auth().signInWithEmailAndPassword(this.email, this.pw)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          // 자동로그인 구현
          if (this.isDisabled == true) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
              return firebase.auth().signInWithEmailAndPassword(this.email, this.pw);
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);
            });
          }
          //자동로그인 선택 xx
          else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
            .then(() => {
              return firebase.auth().signInWithEmailAndPassword(this.email, this.pw);
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);
            });
          }

          //비밀번호를 변경하였을 경우 DB에 업데이트 되는 내용//
          firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
              this.uid = user.uid;
              console.log(this.uid)
            }
          });

          const db = firebase.firestore();
          
          db.collection("peace_makers").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(doc.id === this.uid) {
                if(this.pw == doc.data().userPW) {
                  console.log("맞아요")
                } else {
                  console.log("틀려요")
                  console.log(this.pw)
                  db.collection('peace_makers').doc(user.uid).update({
                    userPW: this.pw
                  }).then(() => {
                    console.log('Document successfully updated!')
                  }).catch((error) => {
                    // The document probably doesn't exist.
                    console.error('Error updating document: ', error);
                  })
                }
              }
            })
          })
          //-------------------------------------------------//

          //화면 이동
          if (user.emailVerified) {
            console.log(
              '유저 로그인 성공, 유저 eamil 인증여부:' + user.emailVerified
            );
            this.router.navigate(['home', 'main']);
            const toast = await this.toastController.create({
              message: '환영합니다!',
              duration: 2000,
            });
            toast.present();
          } else {
            await this.alertCtrl
              .create({
                header: '로그인 실패',
                message:
                  '로그인 하실 이메일로 이메일 주소 인증을 보냈습니다. 이메일 주소 인증 이후 로그인을 진행하여 주세요.',
                buttons: [
                  {
                    text: '확인',
                    handler: async (res) => {
                      this.router.navigate(['home', 'my-page', 'login']);
                    },
                  },
                ],
              })
              .then((res) => res.present());
          }
        })
        // 에러 관련 안내 부분
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == 'auth/wrong-password') {
            this.error_msg = '비밀번호를 잘못 입력하였습니다.';
          } else if (errorCode == 'auth/invalid-email') {
            this.error_msg = '유효하지 않은 이메일입니다.';
          } else if (errorMessage) {
            this.error_msg = '존재하지 않는 계정입니다.';
          }
        });
    }
  }
  moveToRes() {
    this.router.navigate(['home', 'my-page', 'login', 'res']);
  }
  // 비밀번호 찾기로 이동
  moveToFind_email_pw() {
    this.router.navigate(['home', 'my-page', 'login', 'find-email-pw']);
  }
}
