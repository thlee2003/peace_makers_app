import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-method',
  templateUrl: './method.page.html',
  styleUrls: ['./method.page.scss'],
})
export class MethodPage implements OnInit {

  constructor(private router: Router) { }

  moveToAmount() {
    this.router.navigate(['home','support','method','amount'])
  }

  ngOnInit() {
  }

}
