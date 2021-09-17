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
        loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'campagin',
        loadChildren: () => import('./campagin/campagin.module').then( m => m.CampaginPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
      },
      {
        path: 'my-page',
        loadChildren: () => import('./my-page/my-page.module').then( m => m.MyPagePageModule)
      },
      {
        path: 'my-page-login',
        loadChildren: () => import('./my-page-login/my-page-login.module').then( m => m.MyPageLoginPageModule)
      },
      {
        path: 'participation',
        loadChildren: () => import('./participation/participation.module').then( m => m.ParticipationPageModule)
      },
      {
        path: '',
        redirectTo: '../home/main',
        pathMatch: 'full'
      }     
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
