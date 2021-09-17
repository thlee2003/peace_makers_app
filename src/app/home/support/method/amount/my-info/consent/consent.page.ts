import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
