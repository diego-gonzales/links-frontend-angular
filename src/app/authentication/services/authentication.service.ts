import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';

import { User, UserBasicInfo } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private urlAPI: string = environment.urlAPI;
  private _isAuthenticated!: boolean;
  private _userBasicInfo!: UserBasicInfo;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  };

  get userBasicInfo(): UserBasicInfo {
    return {...this._userBasicInfo};
  };


  constructor( private http: HttpClient ) {
    /* esto lo hice porque al estar en el home si estoy logueado no debe aparecer las opciones de logueo. Ya que esto llama
    al validateToken al iniciar este servicio y como lo injecto en el home component entonces tendré el valor de isAuthenticated
    actualizado.*/
    this.validateToken().subscribe();
  };


  sigInUser( user: User ) {
    return this.http.post<UserResponse>(`${this.urlAPI}/users/signin`, user)
               .pipe(
                 delay(1000),
                 tap( resp => localStorage.setItem('fake_token', resp.user._id)),
                 map( resp => resp.message )
               )
  };

  signUpUser( user: User ) {
    return this.http.post<UserResponse>(`${this.urlAPI}/users`, user)
               .pipe(
                 delay(1000),
                 tap( resp => localStorage.setItem('fake_token', resp.user._id) ),
                 map( resp => resp.message )
               )
  };

  logout() {
    localStorage.clear();
    this._isAuthenticated = false;
  };


  // Metodo creada para usar en el guard
  validateToken(): Observable<boolean> {
    // Guarda en el local storage el id de un usuario, el cual simula mi token
    const idUser = localStorage.getItem('fake_token') || '';

    return this.http.get<UserResponse>(`${this.urlAPI}/users/${idUser}`)
               .pipe(
                  map( resp => {
                    localStorage.setItem('fake_token', resp.user._id);
                    this._isAuthenticated = true; // me sirve para mostrar o no los links de mi navbar
                    this._userBasicInfo = {
                      id: resp.user._id,
                      fullname: resp.user.fullname,
                      username: resp.user.username
                    };

                    return true;
                  }),
                  catchError( err => {
                    localStorage.clear(); // esto para evitar el error tipico cuando protegemos el modulo de login, que no deja entrar ahi
                    this._isAuthenticated = false;
                    return of(false)
                 })
               );
  };

}
