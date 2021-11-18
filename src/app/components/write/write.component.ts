import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  Enrollment() {
    console.log(this.title, this.text);
    if (this.title === undefined || this.text === undefined) {
      this.error_msg = '내용을 입력하세요';
    } else {
      this.modalCtrl.dismiss();
    }
  }
}
