import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-unification',
  templateUrl: './student-unification.component.html',
  styleUrls: ['./student-unification.component.scss'],
})
export class StudentUnificationComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
