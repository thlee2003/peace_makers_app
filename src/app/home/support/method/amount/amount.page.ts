import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {

  method: string;
  pay: number;
  error_msg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  moveToMy_info() {

    if (this.pay < 5000 || this.pay == undefined) {
      this.error_msg = "5000원 이상 입력해주세요"
    } else {
      // 입력값 전달
      let navigationExtras: NavigationExtras = {
        state: {
          method: this.method,
          pay: this.pay
        }
      }
      this.router.navigate(['home','support','method','amount','my-info'], navigationExtras)  
    }
  }

  ngOnInit() {
    // 입력값 받기
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.method = this.router.getCurrentNavigation().extras.state.method
      }
    })
  }

}
