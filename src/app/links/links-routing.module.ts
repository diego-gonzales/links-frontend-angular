import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './pages/profile/profile.component';
import { ListLinksComponent } from './pages/list-links/list-links.component';
import { FormLinkComponent } from './pages/form-link/form-link.component';
// import { ValidateTokenGuard } from '../shared/guards/validate-token.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        // canActivate: [ValidateTokenGuard],
      },
      {
        path: 'list',
        component: ListLinksComponent,
        // canActivate: [ValidateTokenGuard],
      },
      {
        path: 'create',
        component: FormLinkComponent,
        // canActivate: [ValidateTokenGuard],
      },
      {
        path: 'update/:idLink',
        component: FormLinkComponent,
        // canActivate: [ValidateTokenGuard],
      },
      {
        path: '**',
        redirectTo: 'profile'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksRoutingModule { }
