import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IamportCordova } from '@ionic-native/iamport-cordova';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.page.html',
  styleUrls: ['./consent.page.scss'],
})
export class ConsentPage implements OnInit {

  isDisabled: boolean = false;
  checkmark: string = "checkmark-circle-outline"
  error_msg: string;

  constructor(private router: Router) { }
  
  onClick() {
    if (this.isDisabled === false) {
      this.error_msg = "개인정보 수집 및 이용 동의에 체크하세요"
    }
    else {
      console.log('a')    
      var userCode = 'imp22587850';                       // 가맹점 식별코드
      var data = {
        pg: 'html5_inicis',                           // PG사
        pay_method: 'card',                           // 결제수단
        name: 'peace_makers test',                   // 주문명
        merchant_uid: 'mid_' + new Date().getTime(),  // 주문번호
        amount: '10',                               // 결제금액
        buyer_name: '홍길동',                           // 구매자 이름
        buyer_tel: '01012341234',                     // 구매자 연락처
        buyer_email: '',           // 구매자 이메일
        app_scheme: 'example',                        // 앱 URL 스킴
      };
  
      // 4. 아임포트 코르도바 파라미터 정의
      var params = {
        userCode: userCode,                           // 4-1. 가맹점 식별코드 정의
        data: data,                                   // 4-2. 결제 데이터 정의    
        callback: function(response) {                // 4-3. 콜백 함수 정의
          alert(JSON.stringify(response));
        },
      };
      // 5. 결제창 호출
      IamportCordova.payment(params);

    }
  }

  togglecheck() {
    this.isDisabled = !this.isDisabled;
    this.checkmark = this.isDisabled ? 'checkmark-circle' : 'checkmark-circle-outline'
    console.log(this.isDisabled)
  }

  ngOnInit() {
  }

}
