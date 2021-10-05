import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {
  isDisabled: boolean = false;
  checkmark: string = 'checkmark-circle-outline';
  error_msg: string;
  method: string;
  pay: string;
  name: string;
  phone: string;
  email: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClick() {
    if (this.isDisabled === false) {
      this.error_msg = '개인정보 수집 및 이용 동의에 체크하세요';
    } else {
      console.log(this.method, this.pay, this.name, this.phone, this.email);
    }
  }

  togglecheck() {
    this.isDisabled = !this.isDisabled;
    this.checkmark = this.isDisabled
      ? 'checkmark-circle'
      : 'checkmark-circle-outline';
    console.log(this.isDisabled);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.method = this.router.getCurrentNavigation().extras.state.method;
        this.pay = String(this.router.getCurrentNavigation().extras.state.pay);
        this.name = this.router.getCurrentNavigation().extras.state.name;
        this.phone = String(
          this.router.getCurrentNavigation().extras.state.phone
        );
        this.email = this.router.getCurrentNavigation().extras.state.method;
      }
    });
  }
}
