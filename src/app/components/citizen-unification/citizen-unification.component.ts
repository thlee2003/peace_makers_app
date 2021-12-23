import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citizen-unification',
  templateUrl: './citizen-unification.component.html',
  styleUrls: ['./citizen-unification.component.scss'],
})
export class CitizenUnificationComponent implements OnInit {
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
