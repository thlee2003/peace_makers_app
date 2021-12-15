import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-citizen-unification',
  templateUrl: './citizen-unification.component.html',
  styleUrls: ['./citizen-unification.component.scss'],
})
export class CitizenUnificationComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
