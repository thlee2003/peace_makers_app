import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-find-email',
  templateUrl: './find-email.page.html',
  styleUrls: ['./find-email.page.scss'],
})
export class FindEmailPage implements OnInit {

  error_msg: string;
  name: string;
  call: string;

  constructor(private nav: NavController) { }

  moveToFind_email() {
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
      console.log(params)
      this.nav.navigateForward(['home','my-page','login','find-email-pw','show-email'], {state: params})
    }
  }

  ngOnInit() {
  }

}
