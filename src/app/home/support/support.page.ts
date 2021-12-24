import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  image: string;
  video1: string;
  video2: string;
  outVideo1: string;
  outVideo2: string;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    //firestore에서 해당 db 가져오기
    const db = firebase.firestore();
    //storage 연결
    const storage = firebase.storage().ref();
    const docRef = db.collection('admin').doc('support');
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.video1 = doc.data().video1;
        this.video2 = doc.data().video2;
        this.outVideo1 =
          'https://www.youtube.com/embed/' + this.video1.split('.be/')[1];
        this.outVideo2 =
          'https://www.youtube.com/embed/' + this.video2.split('.be/')[1];
        storage
          .child(`support/${doc.data().images}`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.image = url;
          });
        document.getElementById('video1').innerHTML = `<iframe
          width="100%"
          height="100%"
          src=${this.outVideo1}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          ></iframe>`;
        document.getElementById('video2').innerHTML = `<iframe
          width="100%"
          height="100%"
          src=${this.outVideo2}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          ></iframe>`;
      }
    });
  }

  async moveToMethod() {
    alert('후원금은 현재 계좌로 받고 있습니다.');
  }
}
