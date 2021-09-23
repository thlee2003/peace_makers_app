import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-method',
  templateUrl: './method.page.html',
  styleUrls: ['./method.page.scss'],
})
export class MethodPage implements OnInit {

  constructor(private router: Router) { }

  moveToAmount(method) {
    // 입력값 전달
    let navigationExtras: NavigationExtras = {
      state: {
        method: method
      }
    }
    this.router.navigate(['home','support','method','amount'], navigationExtras)
  }

  ngOnInit() {
  }

}
