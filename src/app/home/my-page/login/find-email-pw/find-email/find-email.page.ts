import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-find-email',
  templateUrl: './find-email.page.html',
  styleUrls: ['./find-email.page.scss'],
})
export class FindEmailPage implements OnInit {

  error_msg: string;
  name: string;
  call: string;

  constructor(
    private nav: NavController,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

    async ngOnInit() {}
  

  moveToFind_email() {
    //배열
    var aaa = [];
      
      let params: any = {
      name: this.name,
      call: this.call
    }
    if (this.name == undefined) {
      this.error_msg = "이름을 입력하세요"
    }
    else if (this.call == undefined) {
      this.error_msg = "전화번호를 입력하세요"
    }
    else{
      this.error_msg=""
      const db = firebase.firestore();
      db.collection("peace_makers").get().then(async (querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          // console.log((doc.id, doc.data().userName == this.name, doc.data().userPhone == this.call) == true)
          if((doc.id, doc.data().userName == this.name, doc.data().userPhone == this.call) == true) {
            aaa.push(doc.data().userID)
            console.log(aaa)
          }

        });
        // 배열 내 값이 0이 아니라면 아이디 보여주기
        if(aaa.length > 0) {
          await this.alertCtrl.create({
              header: this.name+"님의 아이디를 찾았습니다!",
              message: this.name+"님의 아이디는"+aaa[0]+"입니다.",
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
