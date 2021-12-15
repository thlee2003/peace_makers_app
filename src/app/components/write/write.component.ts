import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import firebase from 'firebase';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  title: string;
  text: string;
  error_msg: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async onClick() {
    console.log(this.title, this.text);

    if (this.title === undefined || this.text === undefined) {
      this.error_msg = '내용을 입력하세요';
    } 
    else {
      this.modalCtrl.dismiss();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const db = firebase.firestore();
          const docRef = db.collection('peace_makers').doc(user.uid)
          docRef.get().then((doc) => {
            if(doc.exists) {
              var dbdb = db.collection('writing').doc(doc.data().userName)
                .collection(this.title).doc('aaa');
                dbdb.set({
                  title: this.title,
                text: this.text,
                user_name: doc.data().userName
              }).then(() => {
                console.log('성공');
              }).catch((error) => {
                console.log(error)
              })
            }
          })
        }
      })
    }
    // window.location.reload()
  }
}
