import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

import firebase from 'firebase';

import axios from 'axios';

import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  rank: string;
  date: string;
  call_num: number;
  company: string;
  company_regist_num: string;
  representative: string;
  open_date: string;
  institution: string;
  films: Observable<any>;
  selectTabs = 'personal';
  segmentValue: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public httpClient: HttpClient
  ) {}

  async ngOnInit() {}

  segmentChanged(e) {
    console.log(e.detail.value);
    this.segmentValue = e.detail.value;
  }

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
      this.error_msg = '비밀번호는 8 ~ 16자리로 입력해주세요.';
    }
    //else if (!check.test(this.pw)) {
    //   this.error_msg = '비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16자리로 입력해주세요.';
    // }
    else if (this.check_pw == undefined) {
      this.error_msg = '비밀번호 확인을 입력하세요.';
    } else if (this.name == undefined) {
      this.error_msg = '이름을 입력하세요.';
    } else if (this.rank == undefined && this.segmentValue !== 'personal') {
      this.error_msg = '직급을 입력하세요.';
    } else if (this.date == undefined && this.segmentValue === 'personal') {
      this.error_msg = '생년월일을 입력하세요.';
    } else if (this.call_num == undefined) {
      this.error_msg = '전화번호을 입력하세요.';
    } else if (this.pw != this.check_pw) {
      this.error_msg = '비밀번호와 비밀번호 확인이 같지 않음.';
    } else if (this.company == undefined && this.segmentValue === 'company') {
      this.error_msg = '회사명을 입력하세요.';
    } else if (
      this.company_regist_num == undefined &&
      this.segmentValue == 'company'
    ) {
      this.error_msg = '사업자등록번호 입력하세요.';
    } else if (
      this.institution == undefined &&
      this.segmentValue == 'institution'
    ) {
      this.error_msg = '기관명을 입력하세요.';
    } else {
      this.error_msg = '';
      console.log(this.company_regist_num, this.representative, this.open_date);
      fetch(
        'https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=Bj4ox2avWwiO9K6C%2F2zmpE9xbtfGnWi%2BW%2ByRYiGJ0P5QOTAXsRqXTEr%2BlHImSxQN3bYlRFGMY9csmnw%2Fmw%2BoeQ%3D%3D',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businesses: [
              {
                b_no: this.company_regist_num.toString(),
                start_dt: this.open_date.toString(),
                p_nm: this.representative,
              },
            ],
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data[0].valid);
          if (res.data[0].valid === '02') {
            this.error_msg = '등록되지 않은 사업자입니다.';
          } else if (res.data[0].valid === '01') {
            //회원가입
            const result = firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.pw)
              .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

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
                              this.router.navigate(['home', 'login']);
                            },
                          },
                        ],
                      })
                      .then((res) => res.present());
                  });

                // firestore 관련 선언
                const db = firebase.firestore();

                // 사업자일 경우 firestore
                if (user && this.segmentValue === 'company') {
                  db.collection('peace_makers')
                    .doc(user.uid)
                    .set({
                      userName: this.name,
                      userRank: this.rank,
                      userCompany: this.company,
                      userCompany_num: this.company_regist_num,
                      userID: this.email,
                      userPW: this.pw,
                      userPhone: this.call_num,
                    })
                    .then(function () {
                      console.log('firestore()DB, 유저 추가 성공');
                    })
                    .catch((error) => {
                      console.error('firestore()DB추가 실패', error);
                    });
                }

                // 기관일 경우 firestore
                else if (user && this.segmentValue === 'institution') {
                  db.collection('peace_makers')
                    .doc(user.uid)
                    .set({
                      userName: this.name,
                      userRank: this.rank,
                      userInstitution: this.institution,
                      userID: this.email,
                      userPW: this.pw,
                      userPhone: this.call_num,
                    })
                    .then(function () {
                      console.log('firestore()DB, 유저 추가 성공');
                    })
                    .catch((error) => {
                      console.error('firestore()DB추가 실패', error);
                    });
                }

                // 개인일 경우 firestore
                else if (user && this.segmentValue === 'personal') {
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
                const errorCode = error.code;
                const errorMessage = error.message;
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
        });
    }
  }
}
