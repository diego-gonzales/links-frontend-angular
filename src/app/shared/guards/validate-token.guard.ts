import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor( private authenticationService: AuthenticationService,
               private router: Router ) { }


  canActivate(): Observable<boolean> | boolean {
    return this.authenticationService.validateToken()
               .pipe(
                  tap( resp => {
                    if ( !resp ) {
                      this.router.navigateByUrl('/authentication/signin');
                    };
                  })
               )
  };

  canLoad(): Observable<boolean> | boolean {
    return this.authenticationService.validateToken()
               .pipe(
                 tap( resp => {
                   if (!resp) {
                     this.router.navigate(['/authentication/signin'])
                   }
                 })
               )
  };
}
