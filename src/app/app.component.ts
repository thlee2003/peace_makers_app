import { Component, OnInit } from '@angular/core';

import firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

const firebaseConfig = {
  apiKey: 'AIzaSyDDDT_M70gUkpq7ubOcChoePbU1cy_G5XQ',
  authDomain: 'ngo-platform-9cbdb.firebaseapp.com',
  projectId: 'ngo-platform-9cbdb',
  storageBucket: 'ngo-platform-9cbdb.appspot.com',
  messagingSenderId: '1032461306472',
  appId: '1:1032461306472:web:5c2909e12adf1beac409dd',
  measurementId: 'G-1Q8E5LDVVW',
};

firebase.initializeApp(firebaseConfig);

