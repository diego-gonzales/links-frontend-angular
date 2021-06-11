import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LinksRoutingModule } from './links-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './pages/profile/profile.component';
import { ListLinksComponent } from './pages/list-links/list-links.component';
import { FormLinkComponent } from './pages/form-link/form-link.component';
import { CardLinkComponent } from './components/card-link/card-link.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ListLinksComponent,
    FormLinkComponent,
    CardLinkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LinksRoutingModule,
    SharedModule
  ]
})
export class LinksModule { }
