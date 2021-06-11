import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .logout {
        cursor: pointer;
      }
    `
  ]
})
export class NavbarComponent implements OnInit {

  get isAuthenticated() {
    return this.authenticationService.isAuthenticated;
  };


  constructor( private authenticationService: AuthenticationService,
               private router: Router ) { }

  ngOnInit(): void {}


  logout() {
    this.showSpinnerOfSweetalert();
    setTimeout(() => {
      this.authenticationService.logout();
      this.router.navigate(['/authentication/signin']);
      this.closeSpinnerOfSweetalert();
    }, 1000);
  };

  showSpinnerOfSweetalert() {
    Swal.fire({
      title: 'Closing session...',
      allowOutsideClick: false
    });
    Swal.showLoading();
  };

  closeSpinnerOfSweetalert() {
    Swal.close();
  };
}
