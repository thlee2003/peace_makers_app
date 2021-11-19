import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IamportCordova } from '@ionic-native/iamport-cordova';

import { LoadingController } from '@ionic/angular';

import firebase from 'firebase';

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
  pay: number;
  email: string;
  phone: number;
  name: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    public loadingController: LoadingController
    ) {}

  ngOnInit() {

    // 사용자 정보 가져오기
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.method = this.router.getCurrentNavigation().extras.state.method;
        this.pay = this.router.getCurrentNavigation().extras.state.pay;
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.name = this.router.getCurrentNavigation().extras.state.name;
        this.phone = this.router.getCurrentNavigation().extras.state.phone;
      }
    });
  }

  // 체크박스 체크 여부 확인
  togglecheck() {
    this.isDisabled = !this.isDisabled;
    this.checkmark = this.isDisabled
      ? 'checkmark-circle'
      : 'checkmark-circle-outline';
    console.log(this.isDisabled);
  }

  async onClick() {
    if (this.isDisabled === false) {
      this.error_msg = '개인정보 수집 및 이용 동의에 체크하세요';
    } else {
      const userCode = 'imp22587850'; // 가맹점 식별코드
      const data = {
        pg: 'danal_tpay', // PG사
        pay_method: 'card', // 결제수단
        name: 'peace_makers test', // 주문명
        merchant_uid: 'mid_' + new Date().getTime(), // 주문번호
        amount: String(this.pay), // 결제금액
        buyer_name: String(this.name), // 구매자 이름
        buyer_tel: String(this.phone), // 구매자 연락처
        buyer_email: String(this.email), // 구매자 이메일
        app_scheme: 'example', // 앱 URL 스킴
      };

      // 4. 아임포트 코르도바 파라미터 정의
      var params = {
        userCode: userCode, // 4-1. 가맹점 식별코드 정의
        data: data, // 4-2. 결제 데이터 정의
        callback: function (response) {
          // // 4-3. 콜백 함수 정의
          // alert(JSON.stringify(response));
        },
      };
      
      // 5. 결제창 호출
      IamportCordova.payment(params);
    }
  }
}
