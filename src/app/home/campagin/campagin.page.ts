import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';

@Component({
  selector: 'app-campagin',
  templateUrl: './campagin.page.html',
  styleUrls: ['./campagin.page.scss'],
})
export class CampaginPage implements OnInit {

  campaign1: string;
  campaigntext1: string;
  campaign2: string;
  campaigntext2: string;

  constructor() { }


  async ngOnInit() {
    const container1 = document.querySelector('.container1')
    const container2 = document.querySelector('.container2')
    const db = firebase.firestore()
    const docRof = db.collection("admin").doc("campaign")
    docRof.get().then((doc) => {
      if (doc.exists) {
        const video1 = doc.data().video1
        const video2 = doc.data().video2
        this.campaign1 = doc.data().text1
        this.campaigntext1 = doc.data().text2
        this.campaign2 = doc.data().text3
        this.campaigntext2 = doc.data().text4
        let template1 = video1
        let template2 = video2
        container1.innerHTML = template1
        container2.innerHTML = template2
      }
    })
  }

}
