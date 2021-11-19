import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { WriteComponent } from 'src/app/components/write/write.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  users = [
    {
      name: '구건우',
      text: '사랑의 앞이 튼튼하며, 거친 사막이다. 청춘의 보배를 기쁘며, 날카로우나 구하지 하여도 그러므로 뿐이다. 이상 무엇을 목숨을 그들에게 천하를 능히 위하여, 그들은 듣기만 부패뿐이다. 내는 오직 실로 두손을 봄바람이다. 어디 무엇이 소금이라 있으며, 예가 기관과 인류의 뿐이다. 풀이 청춘의 지혜는 창공에 인간은 때까지 봄바람이다. 인류의 피는 주며, 자신과 쓸쓸하랴? 돋고, 그들의 것은 위하여, 그와 위하여서. 수 웅대한 설레는 피가 청춘이 피고, 것이다. 이는 이상이 구하기 생생하며, 천하를 운다. 어디 꾸며 것은 현저하게 작고 인간의 눈에 것이다. 가장 그들의 실현에 그들의 맺어, 있으랴? 실로 싶이 유소년에게서 얼음에 새 풀밭에 보라. 무엇을 위하여서 튼튼하며, 찾아 들어 우는 피가 구하기 풍부하게 것이다. 두손을 청춘의 물방아 따뜻한 쓸쓸하랴? 과실이 현저하게 몸이 청춘 이는 꽃이 피고, 것이 뭇 아니다. 오직 같으며, 인간은 곧 있는 있는 위하여서. 우리 방황하여도, 꽃이 청춘을 이것이다. 것이다.보라, 열락의 청춘이 싶이 크고 끓는다. 창공에 그들을 노년에게서 봄바람을 밝은 하여도 것이다. 얼음 착목한는 것은 있을 거선의 두기 속잎나고, 것이다.',
      img: ['../../../assets/imgs/test.jpg', '../../../assets/imgs/img1.jpg'],
      good: '2',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: [
        '../../../assets/imgs/stillcut2.jpg',
        '../../../assets/imgs/stillcut3.jpg',
      ],
      good: '5',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: ['../../../assets/imgs/img3.jpg', '../../../assets/imgs/img4.jpg'],
      good: '1',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: ['../../../assets/imgs/img6.jpg', '../../../assets/imgs/img5.jpg'],
      good: '7',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: ['../../../assets/imgs/img7.jpg', '../../../assets/imgs/img8.jpg'],
      good: '2',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: ['../../../assets/imgs/img10.jpg', '../../../assets/imgs/img9.jpg'],
      good: '7',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: ['../../../assets/imgs/img11.png', '../../../assets/imgs/img12.jpg'],
      good: '9',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
    {
      name: '구건우',
      text: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
      img: [
        '../../../assets/imgs/main1.jpg',
        '../../../assets/imgs/stillcut1.jpg',
      ],
      good: '5',
      comments: [
        { writer: '구건우', text: '좋아요' },
        { writer: '구건우', text: '기대되요' },
        { writer: '구건우', text: '멋저요' },
      ],
    },
  ];
  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private router: Router
  ) {
    platform.ready().then(() => {
      this.backButtonEvent();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.backButtonAlert();
    });
  }

  async backButtonAlert() {
    this.router.navigate(['home', 'main']);
  }

  async openModal(user) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        name: user.name,
        text: user.text,
        imgs: user.img,
        good: user.good,
        comments: user.comments,
      },
    });
    await modal.present();
    console.log(user);
  }

  async write() {
    const modal = await this.modalCtrl.create({
      component: WriteComponent,
    });
    await modal.present();
  }

  ngOnInit() {}
}
