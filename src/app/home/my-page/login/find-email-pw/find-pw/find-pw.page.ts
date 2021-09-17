import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import firebase from 'firebase';
import "firebase/auth";

@Component({
  selector: 'app-find-pw',
  templateUrl: './find-pw.page.html',
  styleUrls: ['./find-pw.page.scss'],
})

export class FindPwPage implements OnInit {

  error_msg: string;
  name: string;
  email: string;
  call: string;
  pw: string;
  call_num: number;

  constructor(
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {}

  // 비밀번호 찾기 버튼을 눌렀을때
  async moveToShwo_pw() {
    if (this.email == undefined) {
      this.error_msg = "이메일을 입력하세요"
    } 
    else if (this.email.includes("@") == false) {
      this.error_msg = "이메일 형식이 아닙니다.";
    }
    else {
      this.error_msg = ""

      const user = firebase.auth().currentUser;
      const uid = firebase.auth().currentUser.uid;

      // var db = firebase.firestore();
      //   db.collection("peace_makers").doc(user.uid).update({
      //     userPW: pw
      // })
      
      // 재설정 이메일 보내기
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(async() => {
        // Password reset email sent!
        await this.alertCtrl.create({
          header: "비밀번호 재설정 이메일 전송 완료",
          message: "해당 이메일로 비밀번호 재설정 관련 내용을 보냈습니다. 이메일을 확인해주세요.",
          buttons: [
            {
              text: "확인", handler: (res) => {
                this.router.navigate(['home','my-page','login'])
              }
            }
          ]
        }).then(res => res.present());
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == 'auth/invalid-email') {
          this.error_msg = "잘못된 이메일입니다.";
        }
        else if(errorMessage) {
          this.error_msg = "존재하지 않는 계정입니다.";
        }
      });
    }
  }
}
