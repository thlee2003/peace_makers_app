import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peacemaker-training',
  templateUrl: './peacemaker-training.component.html',
  styleUrls: ['./peacemaker-training.component.scss'],
})
export class PeacemakerTrainingComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  moveToSupport() {
    this.router.navigate(['home', 'support', 'method']);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
