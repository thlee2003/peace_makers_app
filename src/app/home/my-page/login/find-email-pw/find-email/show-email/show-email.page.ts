import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-show-email',
  templateUrl: './show-email.page.html',
  styleUrls: ['./show-email.page.scss'],
})
export class ShowEmailPage implements OnInit {

  email: string;

  constructor(private router: Router) {
    
  }

  moveToFind_pw() {
    this.router.navigate(['home','my-page','login','find-email-pw','find-pw'])
  }

  moveToLogin() {
    this.router.navigate(['home','my-page','login'])
  }

  async ngOnInit() {
    
  }

}
