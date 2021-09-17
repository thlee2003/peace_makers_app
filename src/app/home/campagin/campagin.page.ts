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
    const getdb = db.collection("admin").doc("campaign");
    getdb.get().then((doc) => {
      if (doc.exists) {
        this.campaign1 = doc.data().text1
        this.campaigntext1 = doc.data().text2
        this.campaign2 = doc.data().text3
        this.campaigntext2 = doc.data().text4
        const a = doc.data().video1
        const b = doc.data().video2
        let templeta1 = a
        let templeta2 = b
        console.log(templeta1)
        console.log(templeta2)
        container1.innerHTML = templeta1
        container2.innerHTML = templeta2
      }
    })
  }

}
