import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';

@Component({
  selector: 'app-new-pw',
  templateUrl: './new-pw.page.html',
  styleUrls: ['./new-pw.page.scss'],
})
export class NewPwPage implements OnInit {
  error_msg: string;
  showPw: boolean = false;
  PwToggleIcon = 'eye-outline';
  isDisabled: boolean = true;
  checkmark = 'checkmark-circle-outline';
  pw: string;
  check_pw: string;

  constructor() { }

  async ngOnInit() {
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

    let check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    
    if(this.pw == undefined) {
      this.error_msg = '비밀번호를 입력하세요.';
    } else if(this.pw.length<8 || this.pw.length>16) {
      this.error_msg = '비밀번호는 8 ~ 16자리로 입력해주세요.';
    } else if (!check.test(this.pw)) {
      this.error_msg = '비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16자리로 입력해주세요.';
    } else if (this.check_pw == undefined) {
      this.error_msg = '비밀번호 확인을 입력하세요.';
    } else if (this.pw != this.check_pw) {
      this.error_msg = '비밀번호와 비밀번호 확인이 같지 않음.';
    } else {
      this.error_msg = "";
      const db = firebase.firestore();
      db.collection('peace_makers').get()
        .then()     
    }
  }
}
