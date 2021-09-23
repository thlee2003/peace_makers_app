import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import firebase from 'firebase';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-my-page-login',
  templateUrl: './my-page-login.page.html',
  styleUrls: ['./my-page-login.page.scss'],
})
export class MyPageLoginPage implements OnInit {

  croppedImage: string;
  percent;
  isUploadStart = false;
  name: string;
  points: number = 0;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private base64: Base64,
    private camera: Camera,
    private crop: Crop,
    private alertCtrl: AlertController,
    ) { }

  // 사진 선택
  async chooseImage() {
    const alertDialog = await this.alertCtrl.create({
      header: "사진을 선택해 주세요",
      buttons: [
        {
          // 카메라로 사진 짝기
          text: "카메라",
          handler: () => {
            let options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.CAMERA,
              encodingType: this.camera.EncodingType.PNG,
              mediaType: this.camera.MediaType.PICTURE,
              destinationType: this.camera.DestinationType.FILE_URI
            };
            this.camera.getPicture(options).then(filePath => {
              this.crop.crop(filePath).then((croppedPath) => {
                this.base64.encodeFile(croppedPath).then(base64Data => {
                  let temp = base64Data.substring(34);
                  this.croppedImage = 'data:image/png;base64,' + temp;
                  // 사진 storage에 업로드
                  this.isUploadStart = true
                  firebase.storage().ref("image/").putString(this.croppedImage, "data_url").then(function(snapshot) {
                  })
                  setTimeout(() => {
                    document.getElementById("image").setAttribute("src",this.croppedImage);
                  }, 250);
                })
              })
            })
          }
        },
        {
          // 갤러리에서 사진 가져오기
          text: "갤러리",
          handler: () => {
            let options: CameraOptions = {
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              encodingType: this.camera.EncodingType.PNG,
              mediaType: this.camera.MediaType.PICTURE,
              destinationType: this.camera.DestinationType.FILE_URI
            };
            this.camera.getPicture(options).then(filePath => {
              this.crop.crop(filePath).then((croppedPath) => {
                this.base64.encodeFile(croppedPath).then(base64Data => {
                  let temp = base64Data.substring(34);
                  this.croppedImage = 'data:image/png;base64,' + temp
                  // 사진 storage에 업로드
                  this.isUploadStart = true
                  firebase.storage().ref("profile/").putString(this.croppedImage, "data_url").then(function(snapshot) {
                  })
                  setTimeout(() => {
                    document.getElementById("image").setAttribute("src", this.croppedImage);
                  }, 250)
                })
              })
            })
          }
        }
      ]
    });
    alertDialog.present();
    
  }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const docRef = db.collection("peace_makers").doc(user.uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            this.name =  doc.data().userName
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        // User is signed out
        // ...
      }
    });
    // storage에서 사진 가져오기
    firebase.storage().ref('profile').getDownloadURL().then((function(url) {
      var img = (<HTMLInputElement>document.getElementById('image'))
      img.src = url
    }))
  }

  async moveToLogout() {
    const result = firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['home','main'])
    }).catch((error) => {
      // An error happened.
    });
    console.log(result)
  }
  moveToModifiy_info() {
    this.router.navigate(['home','my-page','modify-info'])
  }

  moveToPayment_info() {
    this.router.navigate(['home','my-page','payment-info'])
  }


  moveToSetting() {
    this.router.navigate(['home','my-page','setting'])
  }

  async moveToDelete() {
    const user = firebase.auth().currentUser;
    var db = firebase.firestore();

    // 회원탈퇴시 firestore 삭제
    db.collection("peace_makers").doc(user.uid).delete().then(() => {
      //회원탈퇴시 auth 삭제
      user.delete().then(async () => {
        //회원탈퇴 관련 toast
        const toast = await this.toastController.create({
          message: '회원탈퇴가 정상적으로 처리 되었습니다.',
          duration: 2000
        });
        toast.present();
      }).catch((error) => {
      });
      console.log("Document successfully deleted!");
      this.router.navigate(['home','main'])
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}
