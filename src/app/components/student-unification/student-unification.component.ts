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
    this.router.navigate(['home', 'support']);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
