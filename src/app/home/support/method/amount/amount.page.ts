import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.page.html',
  styleUrls: ['./amount.page.scss'],
})
export class AmountPage implements OnInit {
  sp_method: string;
  method: string;
  pay: number;
  name: string;
  phone: number;
  email: string;
  error_msg: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  moveToConsent() {
    if (this.name == undefined) {
      this.error_msg = '이름을 입력하세요';
    } else if (this.phone == undefined) {
      this.error_msg = '전화번호를 입력하세요';
    } else if (this.email == undefined) {
      this.error_msg == '이메일을 입력하세요';
    } else if (this.email.includes('@') == false) {
      this.error_msg = '이메일 형식이 아닙니다.';
    } 
    else {
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     const db = firebase.firestore();
      //     const docRef = db.collection('peace_makers').doc(user.uid);
      //     docRef.get().then((doc) => {
      //       if(doc.exists) {
      //         console.log(doc.data())
      //         this.name = doc.data().userName;
      //         this.phone = doc.data().userPhone;
      //         this.email = doc.data().userID;
      //       } else {
      //         console.log('no such')
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   } else {

      //   }
      // })

      

      let navigationExtras: NavigationExtras = {
        state: {
          method: this.method,
          pay: this.pay,
          name: this.name,
          phone: this.phone,
          email: this.email,
        },
      };
      this.router.navigate(
        ['home', 'support', 'method', 'amount', 'my-info'],
        navigationExtras
      );
      // this.router.navigate(
      //   ['home', 'support', 'method', 'amount', 'my-info'],
      //   navigationExtras
      // );
    }
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection('peace_makers').doc(user.uid);
        docRef.get().then((doc) => {
          if(doc.exists) {
            console.log(doc.data())
            this.name = doc.data().userName;
            this.phone = doc.data().userPhone;
            this.email = doc.data().userID;
          } else {
            console.log('no such')
          }
        })
        .catch((error) => {
          console.log(error);
        });
      } else {

      }
    })

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.method = this.router.getCurrentNavigation().extras.state.method;
        if (this.method == 'temporary') {
          this.sp_method = '일시 후원';
        } else {
          this.sp_method = '정기 후원';
        }
        this.pay = this.router.getCurrentNavigation().extras.state.pay;
      }
    });
  }
}
