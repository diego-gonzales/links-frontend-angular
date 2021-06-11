import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginGuard implements CanActivate {

  constructor( private authenticationService: AuthenticationService,
               private router: Router ) { }


  canActivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('fake_token')) {
      return this.authenticationService.validateToken()
                  .pipe(
                    tap( resp => {
                      if (resp) {
                        this.router.navigate(['/favorite-links/profile']);
                      }
                    })
                  )
    };

    return true;
  };
  
}
