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
  error_msg: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  moveToMy_info() {
    if (this.pay == undefined) {
      this.error_msg = '금액을 입력해 주세요';
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
      this.error_msg = '';
      this.pay = undefined;
    }
  }

  ngOnInit() {}
}
