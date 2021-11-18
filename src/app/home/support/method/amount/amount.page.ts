 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {
  sp_method: string;
  method: string;
  pay: number;
  name: string;
  phone: number;
  email: string;
  error_msg: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  moveToConsent() {
    if (this.name == undefined) {
      this.error_msg = '이름을 입력하세요';
    } else if (this.phone == undefined) {
      this.error_msg = '전화번호를 입력하세요';
    } else if (this.email == undefined) {
      this.error_msg == '이메일을 입력하세요';
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          method: this.method,
          pay: this.pay,
          name: this.name,
          phone: this.phone,
          email: this.email,
        },
      };
      this.router.navigate(
        ['home', 'support', 'method', 'amount', 'my-info'],
        navigationExtras
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.method = this.router.getCurrentNavigation().extras.state.method;
        if (this.method == 'temporary') {
          this.sp_method = '일시 후원';
        } else {
          this.sp_method = '정기 후원';
        }
        this.pay = this.router.getCurrentNavigation().extras.state.pay;
      }
    });
  }
}
