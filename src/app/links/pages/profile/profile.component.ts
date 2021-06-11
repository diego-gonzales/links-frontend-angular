import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { UserBasicInfo } from '../../../authentication/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  get userInfo(): UserBasicInfo {
    return this.authenticationService.userBasicInfo;
  };


  constructor( private authenticationService: AuthenticationService ) { }

  ngOnInit(): void { }

}
