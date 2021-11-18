import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-modify-info',
  templateUrl: './modify-info.page.html',
  styleUrls: ['./modify-info.page.scss'],
})
export class ModifyInfoPage implements OnInit {
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
  institution: string;
  selectTabs = 'personal';
  segmentValue: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // 정보 가져오기
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.a);
        this.selectTabs = this.router.getCurrentNavigation().extras.state.a;
      }
    });
    //현재 로그인한 사용자 가져오기
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //firestore에서 정보 가져오기
        const db = firebase.firestore();
        const docRef = db.collection('peace_makers').doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.name = doc.data().userName;
              this.company = doc.data().userCompany;
              this.company_regist_num = doc.data().userCompany_num;
              this.email = doc.data().userID;
              this.pw = doc.data().userPW;
              this.check_pw = doc.data().userPW;
              this.call_num = doc.data().userPhone;
              this.date = doc.data().userAge;
              this.institution = doc.data().userInstitution;
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      } else {
      }
    });
  }

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

  async moveToChange() {
    if (this.email == undefined) {
      this.error_msg = '이메일을 입력하세요.';
    } else if (this.email.includes('@') == false) {
      this.error_msg = '이메일형식이 아닙니다.';
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

      //버튼 클릭시
      this.router.navigate(['home', 'my-page-login']);

      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          if (
            this.pw !== undefined &&
            this.name !== undefined &&
            this.date !== undefined &&
            this.call_num !== undefined
          ) {
            db.collection('peace_makers')
              .doc(user.uid)
              .update({
                userPW: this.pw,
                userName: this.name,
                userAge: this.date,
                userPhone: this.call_num,
              })
              .then(() => {
                console.log('Document successfully updated!');
              })
              .catch((error) => {
                // The document probably doesn't exist.
                console.error('Error updating document: ', error);
              });
            //업데이트 된 pw를 auth에 저장
            user
              .updatePassword(this.pw)
              .then(() => {})
              .catch((error) => {});

            const toast = await this.toastController.create({
              message: '기본정보 수정이 성공적으로 완료되었습니다!',
              duration: 2000,
            });
            toast.present();
          }
        } else {
          // User is signed out
          // ...
        }
      });
    }
  }
}
