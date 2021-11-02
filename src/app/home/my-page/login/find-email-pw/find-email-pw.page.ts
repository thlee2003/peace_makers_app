import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase';
@Component({
  selector: 'app-find-email-pw',
  templateUrl: './find-email-pw.page.html',
  styleUrls: ['./find-email-pw.page.scss'],
})
export class FindEmailPwPage implements OnInit {
  selectTabs = 'email';
  email: string;
  name: string;
  call_num: string;
  error_msg: string;

  constructor(private router: Router, private alertCtrl: AlertController) {}

  //이메일 찾기를 누르면
  async Find_email() {
    var aaa = [];
    if (this.name == undefined || this.name == '') {
      this.error_msg = '이름을 입력하세요';
    } else if (this.call_num == undefined || this.call_num == '') {
      this.error_msg = '전화번호를 입력하세요';
    } else {
      this.error_msg = '';
      const db = firebase.firestore();
      db.collection('peace_makers').get()
        .then(async (querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            // console.log((doc.id, doc.data().userName == this.name, doc.data().userPhone == this.call) == true)
            if ((doc.id && doc.data().userName == this.name && doc.data().userPhone == this.call_num) == true) {
              aaa.push(doc.data().userID);
              console.log(aaa);
            }
          });
          // 배열 내 값이 0이 아니라면 아이디 보여주기
          if (aaa.length > 0) {
            await this.alertCtrl
              .create({
                header: this.name + '님의 아이디를 찾았습니다!',
                message: this.name + '님의 아이디는' + aaa[0] + '입니다.',
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
            this.name = '';
            this.call_num = '';
          }

          // 값이 0이면 에러 메세지
          else {
            this.error_msg = '사용자 정보를 찾을수 없습니다.';
          }
        });
    }
  }

  //비밀번호 찾기를 누르면

  Find_pw() {
    var aaa = [];

    if (this.email == undefined || this.email == '') {
      this.error_msg = '이메일을 입력하세요';
    } else if (this.email.includes('@') == false) {
      this.error_msg = '이메일 형식이 아닙니다.';
    } else if (this.name == undefined || this.name == '') {
      this.error_msg = '이름을 입력하세요';
    } else if (this.call_num == undefined || this.call_num == '') {
      this.error_msg = '전화번호를 입력하세요';
    } else {
      this.error_msg = '';
      const db = firebase.firestore();

      //DB 컬렉션의 모든 문서 가져오기
      db.collection('peace_makers')
        .get()
        .then(async (querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            // console.log(doc.id, doc.data().userID == this.email, doc.data().userName == this.name, doc.data().userPhone == this.call_num)
            if ((doc.id && doc.data().userID == this.email && doc.data().userName == this.name && doc.data().userPhone == this.call_num) == true) {
              aaa.push(doc.data().userPW);
              console.log(aaa);
            }
          });

          // 배열 내 값이 0이 아니라면 비밀번호 재설정 메일 발송
          if (aaa.length > 0) {

            //이메일
            firebase
              .auth()
              .sendPasswordResetEmail(this.email)
              .then(() => {
                // Password reset email sent!
                // ..
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
              });
            await this.alertCtrl
              .create({
                header: '비밀번호 재설정 메일을 발송하였습니다!',
                message:
                  this.name +
                  '님의 이메일로 비밀번호 재설정 메일을 발송드렸습니다!',
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
            this.email;
            this.name = '';
            this.call_num = '';
          }

          // 값이 0이면 에러 메세지
          else {
            this.error_msg = '사용자 정보를 찾을수 없습니다.';
          }
        });
    }
  }

  segmentChanged($event) {
    if ($event) {
      this.email = '';
      this.name = '';
      this.call_num = '';
      this.error_msg = '';
    }
  }

  ngOnInit() {}
}
