import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { WriteComponent } from 'src/app/components/write/write.component';

import firebase from 'firebase';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  users = [];
  constructor(
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    const db = firebase.firestore();
    db.collection("writing").doc().onSnapshot((doc) => {
      console.log(doc.id, "=>", doc.data())
    })
  }

  //게시글 관련 부분들
  async openModal(user) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        name: user.title,
        text: user.text,
        // imgs: user.img,
        // good: user.good,
        // comments: user.comments,
      },
    });
    await modal.present();
    console.log(user);
  }

  // 글 작성 버튼 클릭시
  async write() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user){
        const modal = await this.modalCtrl.create({
          component: WriteComponent,
        });
        await modal.present();
      }
      else{
        alert("로그인 이후 게시글 작성이 가능합니다.")
      }
    })
  }
}
