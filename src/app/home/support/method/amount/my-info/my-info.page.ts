import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {

  pay: number;
  name: string;
  phone: number;
  email: string;
  error_msg: string;

  constructor(private router: Router) { }

  moveToConsent() {
    if (this.name == undefined) {
      this.error_msg = "이름을 입력하세요"
    } else if (this.phone == undefined) {
      this.error_msg = "전화번호를 입력하세요"
    } else if (this.email == undefined) {
      this.error_msg == "이메일을 입력하세요"
    } else {
      this.router.navigate(['home','support','method','amount','my-info', 'consent'])
    }
  }

  ngOnInit() {

  }

}
