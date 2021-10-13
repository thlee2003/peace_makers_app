import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

import firebase from 'firebase';

import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// 2. 아임포트 코르도바 플러그인 임포트
import { IamportCordova } from '@ionic-native/iamport-cordova';

@Component({
  selector: 'app-res',
  templateUrl: './res.page.html',
  styleUrls: ['./res.page.scss'],
})
export class ResPage implements OnInit {
  error_msg: string;
  showPw: boolean = false;
  PwToggleIcon = 'eye-outline';
  isDisabled: boolean = true;
  checkmark = 'checkmark-circle-outline';
  email: string;
  pw: string;
  check_pw: string;
  name: string;
  date: string;
  call_num: number;
  company: string;
  company_regist_num: number;
  films: Observable<any>;
  selectTabs = '개인';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public httpClient: HttpClient,
    ) {
      // api 들고 오기
      this.films = this.httpClient.get('https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=%09%20Bj4ox2avWwiO9K6C%2F2zmpE9xbtfGnWi%2BW%2ByRYiGJ0P5QOTAXsRqXTEr%2BlHImSxQN3bYlRFGMY9csmnw%2Fmw%2BoeQ%3D%3D');
      this.films
      .subscribe(data => {
        console.log('my data: ', data)
      })
    }
    
  
  async ngOnInit() {}

  togglepw() {
    this.showPw = !this.showPw;
    this.PwToggleIcon = this.showPw ? 'eye-off-outline' : 'eye-outline';
  }

  togglecheck() {
    this.isDisabled = !this.isDisabled;
    this.checkmark = this.isDisabled
      ? 'checkmark-circle-outline'
      : 'checkmark-circle';
  }

  async moveToLogin() {
    if (this.email == undefined) {
      this.error_msg = '이메일을 입력하세요.';
    } else if (this.email.includes('@') == false) {
      this.error_msg = '이메일 형식이 아닙니다.';
    } else if (this.pw == undefined) {
      this.error_msg = '비밀번호를 입력하세요.';
    } else if (this.pw.length < 8 || this.pw.length > 16) {
      this.error_msg = '비밀번호를 8 ~ 16자리로 입력하세요.';
    } else if (this.check_pw == undefined) {
      this.error_msg = '비밀번호 확인을 입력하세요.';
    } else if (this.name == undefined) {
      this.error_msg = '이름을 입력하세요.';
    } else if (this.date == undefined) {
      this.error_msg = '생년월일을 입력하세요.';
    } else if (this.call_num == undefined) {
      this.error_msg = '전화번호을 입력하세요.';
    } else if (this.pw != this.check_pw) {
      this.error_msg = '비밀번호와 비밀번호 확인이 같지 않음.';
    } else if (this.company == undefined && this.isDisabled == false) {
      this.error_msg = '회사명을 입력하세요.';
    } else if (
      this.company_regist_num == undefined &&
      this.isDisabled == false
    ) {
      this.error_msg = '사업자등록번호 입력하세요.';
    } else {
      this.error_msg = '';
      //회원가입

      const result = firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.pw)
        .then(async (userCredential) => {
          // Signed in
          var user = userCredential.user;

          // 이메일 인증 이메일 전송
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(async () => {
              // Email verification sent!
              await this.alertCtrl
                .create({
                  header: '회원가입 성공! 환영합니다!',
                  message:
                    '해당 이메일로 이메일 주소 인증을 보냈습니다. 이메일 주소 인증 이후 로그인을 진행하여 주세요.',
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
            });

          // firestore 관련 선언
          var db = firebase.firestore();

          // 사업자일 경우 firestore
          if (user && !this.isDisabled) {
            db.collection('peace_makers')
              .doc(user.uid)
              .set({
                userName: this.name,
                userCompany: this.company,
                userCompany_num: this.company_regist_num,
                userID: this.email,
                userPW: this.pw,
                userPhone: this.call_num,
                userAge: this.date,
              })
              .then(function () {
                console.log('firestore()DB, 유저 추가 성공');
              })
              .catch((error) => {
                console.error('firestore()DB추가 실패', error);
              });
          }

          // 비사업자일 경우 firestore
          else if (user) {
            db.collection('peace_makers')
              .doc(user.uid)
              .set({
                userName: this.name,
                userID: this.email,
                userPW: this.pw,
                userPhone: this.call_num,
                userAge: this.date,
              })
              .then(function () {
                console.log('firestore()DB, 유저 추가 성공');
              })
              .catch((error) => {
                console.error('firestore()DB추가 실패', error);
              });
          }
        })
        //에러 관련 부분
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            this.error_msg = '이미 사용중인 이메일입니다.';
          } else if (errorCode == 'auth/credential-already-in-use') {
            this.error_msg = '현재 사용중인 계정입니다.';
          } else if (errorCode == 'auth/invalid-email') {
            this.error_msg = '잘못된 이메일입니다.';
          } else if (errorCode == 'auth/wrong-password') {
            this.error_msg = '잘못된 비밀번호입니다.';
          } else if (errorMessage) {
            this.error_msg = '존재하지 않는 계정입니다.';
          }
        });
      console.log(result);
    }
  }
}
