import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  moveToMethod() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.router.navigate(['home','support','method'])
      } else {
        this.alertCtrl.create({
          header: "로그인 후에 가능합니다.",
          buttons: [{
            text: "확인",handler: (res) => {
              this.router.navigate(['home','my-page','login'])
            }
          }]
        })
      }  
    })
  }

  ngOnInit() {
  }

}
