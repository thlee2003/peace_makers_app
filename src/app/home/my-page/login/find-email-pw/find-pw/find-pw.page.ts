import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-find-pw',
  templateUrl: './find-pw.page.html',
  styleUrls: ['./find-pw.page.scss'],
})

export class FindPwPage implements OnInit {

  error_msg: string;
  name: string;
  email: string;
  call: number;
  pw: string;
  call_num: number;
  

  constructor(
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  async ngOnInit() {}

  // 비밀번호 찾기 버튼을 눌렀을때
  async moveToShwo_pw() {
    //배열
    var aaa = [];

    if (this.email == undefined) {
      this.error_msg = "이메일을 입력하세요"
    } 
    else if (this.email.includes("@") == false) {
      this.error_msg = "이메일 형식이 아닙니다.";
    }
    else {
      this.error_msg = ""
      const db = firebase.firestore();
      
      //DB 컬렉션의 모든 문서 가져오기
      db.collection("peace_makers").get().then(async (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          // console.log(doc.id, doc.data().userID == this.email, doc.data().userName == this.name, doc.data().userPhone == this.call_num)
          if((doc.id, doc.data().userID == this.email, doc.data().userName == this.name, doc.data().userPhone == this.call_num) == true) {
            aaa.push(doc.data().userPW)
            console.log(aaa)
          }
        });
        
        // 배열 내 값이 0이 아니라면 비밀번호 재설정 메일 발송
        if(aaa.length > 0) {

          //이메일 
          firebase.auth().sendPasswordResetEmail(this.email)
          .then(() => {
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
          await this.alertCtrl.create({
            header: "비밀번호 재설정 메일을 발송하였습니다!",
            message: this.name+"님의 이메일로 비밀번호 재설정 메일을 발송드렸습니다!",
            buttons: [{
              text: "확인", handler: async (res) => {
                this.router.navigate(['home','my-page','login'])
              }
            }]
          }).then(res => res.present());
        }
      
        // 값이 0이면 에러 메세지
        else {
          this.error_msg = "사용자 정보를 찾을수 없습니다."
        }
      });
    }
  }
}
