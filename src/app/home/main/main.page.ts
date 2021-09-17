import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  peace1: string;
  peacetext1: string;
  peace2: string;
  peacetext2: string;
  peace3: string;
  peacetext3: string;


  constructor(
  ) {}
  

  async ngOnInit() {
    //firestore에서 해당 db 가져오기(실시간으로)
    var db = firebase.firestore();
    db.collection("admin").doc("mainpage")
      .onSnapshot((doc) => {
        this.peace1 = doc.data().text1;
        this.peacetext1 = doc.data().text2;
        this.peace2 = doc.data().text3;
        this.peacetext2 = doc.data().text4;
        this.peace3 = doc.data().text5;
        this.peacetext3 = doc.data().text6;
      });

    // var getdb = db.collection("admin").doc("mainpage");
    // getdb.get().then((doc) => {
    //   if (doc.exists) {
    //     // this.peace1 = doc.data().text1
    //     this.peacetext1 = doc.data().text2
    //     this.peace2 = doc.data().text1
    //     this.peacetext2 = doc.data().text2
    //     this.peace3 = doc.data().text1
    //     this.peacetext3 = doc.data().text2
    //   }
    // })
  }

}
