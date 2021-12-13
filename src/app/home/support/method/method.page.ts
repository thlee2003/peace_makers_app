import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-method',
  templateUrl: './method.page.html',
  styleUrls: ['./method.page.scss'],
})
export class MethodPage implements OnInit {
  selectTabs: string = 'temporary';
  pay: number;
  error: boolean;
  error_msg: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  moveToMy_info() {
    if (this.pay == undefined) {
      this.error = true;
      this.error_msg = '금액을 입력하세요';
    } else if (this.pay < 5000) {
      this.error = true;
      this.error_msg = '5000원 이상 입력하세요';
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          method: this.selectTabs,
          pay: this.pay,
        },
      };
      this.router.navigate(
        ['home', 'support', 'method', 'amount'],
        navigationExtras
      );
      this.error = false;
      this.pay = undefined;
    }
  }
}
