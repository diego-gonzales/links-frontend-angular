import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { showSpinnerOfSweetAlert, closeSpinnerOfSweetAlert } from '../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    fullname: [ '', Validators.required ],
    username: [ '', Validators.required ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });


  constructor( private fb: FormBuilder,
               private authenticationService: AuthenticationService,
               private router: Router ) { }

  ngOnInit(): void { }


  signUp() {
    if (this.myForm.invalid) {
      console.log('Form Invalid');
      return;
    };

    showSpinnerOfSweetAlert('Wait a moment please...');

    const newUser: User = this.myForm.value;

    this.authenticationService.signUpUser(newUser)
        .subscribe( resp => {
          console.log(resp);
          closeSpinnerOfSweetAlert();
          this.router.navigate(['/favorite-links/profile']);
        }, (err) => {
          console.log(err);
        });
  };

}
