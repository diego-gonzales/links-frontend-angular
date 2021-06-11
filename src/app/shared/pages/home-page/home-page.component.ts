import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated;
  };


  constructor( private authenticationService: AuthenticationService,
               private router: Router ) { }

  ngOnInit(): void {
  }


  getStarted() {
    (this.isAuthenticated)
          ? this.router.navigateByUrl('/favorite-links/list')
          : this.router.navigateByUrl('/authentication/signin');
  };

}
