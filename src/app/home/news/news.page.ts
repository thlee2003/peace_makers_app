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
  login = false;
  users = [];
  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    const db = firebase.firestore();
    const storage = firebase.storage().ref();
    // let imgArr = [];
    db.collection('admin_news')
      .get()
      .then((query) => {
        query.forEach((doc) => {
          this.users.push({
            title: doc.data().title,
            images: doc.data().images,
            image: [],
            content: doc.data().content,
          });
        });
      })
      .then(() => {
        console.log(this.users);
        // for(let i = 0; i < )
        this.users.forEach((data) => {
          console.log(data);
          for (let i = 0; i < data.images.length; i++) {
            storage
              .child(`news/${data.title}/${data.images[i]}`)
              .getDownloadURL()
              .then((url) => {
                // console.log(data.image, url);
                data.image.push(url);
              });
          }
        });
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.login = true;
      } else {
        this.login = false;
      }
    });
  }

  //게시글 관련 부분들
  async openModal(user) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        name: user.title,
        text: user.content,
        image: user.image,
        // good: user.good,
        // comments: user.comments,
      },
    });
    await modal.present();
    console.log(this.users);
  }

  // 글 작성 버튼 클릭시
  async write() {
    const modal = await this.modalCtrl.create({
      component: WriteComponent,
    });
    await modal.present();
  }
}
