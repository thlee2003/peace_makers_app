import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./main/main.module').then((m) => m.MainPageModule),
          },
        ],
      },
      {
        path: 'campagin',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./campagin/campagin.module').then(
                (m) => m.CampaginPageModule
              ),
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./news/news.module').then((m) => m.NewsPageModule),
          },
        ],
      },
      {
        path: 'support',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./support/support.module').then(
                (m) => m.SupportPageModule
              ),
          },
        ],
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./login/login.module').then((m) => m.LoginPageModule),
          },
        ],
      },
      {
        path: 'my-page-login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./my-page-login/my-page-login.module').then(
                (m) => m.MyPageLoginPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '../home/main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '../home/main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
