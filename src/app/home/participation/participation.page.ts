import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.page.html',
  styleUrls: ['./participation.page.scss'],
})
export class ParticipationPage implements OnInit {

  constructor(
    private router: Router
  ) { }
  
  // 영상 넣기
  async ngOnInit() {
    const container3 = document.querySelector('.container3')
    const container4 = document.querySelector('.container4')
    const container5 = document.querySelector('.container5')
    const db = firebase.firestore()
    const getdb = db.collection("admin").doc("participation");
    getdb.get().then((doc) => {
      if(doc.exists) {
        const a = doc.data().video3
        const b = doc.data().video4
        const c = doc.data().video5
        let templeta3 = a
        let templeta4 = b
        let templeta5 = c
        container3.innerHTML = templeta3
        container4.innerHTML = templeta4
        container5.innerHTML = templeta5
      }
    })
  }

  moveTosupport() {
    this.router.navigate(['home','support'])
  }

}
