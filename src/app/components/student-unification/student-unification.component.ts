import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-unification',
  templateUrl: './student-unification.component.html',
  styleUrls: ['./student-unification.component.scss'],
})
export class StudentUnificationComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  moveToSupport() {
    alert("후원금은 현재 계좌로 받고 있습니다.")
    // this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
