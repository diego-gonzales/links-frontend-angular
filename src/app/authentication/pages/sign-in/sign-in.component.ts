import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interfaces/user.interface';
import { closeSpinnerOfSweetAlert, showSpinnerOfSweetAlert, showErrorMessage } from '../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });


  constructor( private fb: FormBuilder,
               private authenticationService: AuthenticationService,
               private router: Router ) { }

  ngOnInit(): void { }


  signIn() {
    if (this.myForm.invalid) {
      console.log('Form Invalid')
      return;
    };

    showSpinnerOfSweetAlert('Logging in...');

    const user: User = this.myForm.value;

    this.authenticationService.sigInUser(user)
    .subscribe( resp => {
          console.log(resp);
          closeSpinnerOfSweetAlert();
          this.router.navigate(['/favorite-links/profile']);
        }, (err) => {
          showErrorMessage(err.error.message);
        })
  };

}
