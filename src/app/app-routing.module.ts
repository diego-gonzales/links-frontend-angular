import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ValidateTokenGuard } from './shared/guards/validate-token.guard';
import { ValidateLoginGuard } from './shared/guards/validate-login.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule ),
    canActivate: [ValidateLoginGuard]
  },
  {
    path: 'favorite-links',
    loadChildren: () => import('./links/links.module').then( m => m.LinksModule ),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
