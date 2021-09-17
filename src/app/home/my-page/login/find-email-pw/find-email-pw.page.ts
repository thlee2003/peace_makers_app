import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-email-pw',
  templateUrl: './find-email-pw.page.html',
  styleUrls: ['./find-email-pw.page.scss'],
})
export class FindEmailPwPage implements OnInit {

  constructor(private router: Router) { }

  moveToFind_email() {
    this.router.navigate(['home','my-page','login','find-email-pw','find-email'])
  }

  moveToFind_pw() {
    this.router.navigate(['home','my-page','login','find-email-pw','find-pw'])
  }

  ngOnInit() {
  }

}
