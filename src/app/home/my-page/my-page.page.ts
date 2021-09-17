import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.page.html',
  styleUrls: ['./my-page.page.scss'],
})
export class MyPagePage implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {}

  moveToLogin() {
    this.router.navigate(['home','my-page','login'])
  }

  moveToRes() {
    this.router.navigate(['home','my-page','login', 'res'])
  }
}
