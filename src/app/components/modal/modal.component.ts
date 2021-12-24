import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() name: string;
  @Input() text: string;
  @Input() image;
  @Input() good: string;
  @Input() comments;
  comment: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.image, this.comments);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  // writeComment() {
  //   console.log(this.comment);
  //   this.comment = null;
  // }
}
