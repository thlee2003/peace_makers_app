import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {

  method: string;
  pay: number;
  name: string;
  phone: number;
  email: string;
  error_msg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  moveToConsent() {
    if (this.name == undefined) {
      this.error_msg = "이름을 입력하세요"
    } else if (this.phone == undefined) {
      this.error_msg = "전화번호를 입력하세요"
    } else if (this.email == undefined) {
      this.error_msg == "이메일을 입력하세요"
    } else {
      // 입력값 전달
      let navigationExtras: NavigationExtras = {
        state: {
          method: this.method,
          pay: this.pay,
          email: this.email,
          name: this.name,
          phone: this.phone
        }
      }
      this.router.navigate(['home','support','method','amount','my-info', 'consent'], navigationExtras)
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.method = this.router.getCurrentNavigation().extras.state.method
        this.pay = this.router.getCurrentNavigation().extras.state.pay
      }
    })
  }

}
