import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserResponse } from '../../authentication/interfaces/user-response.interface';
import { LinkResponse, Link } from '../interfaces/link-response.interface';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private _urlAPI: string = environment.urlAPI;


  constructor( private http: HttpClient ) { };


  getLinksOfUser(): Observable<Link[]> {
    const idUser = localStorage.getItem('fake_token');
    return this.http.get<UserResponse>(`${this._urlAPI}/users/${idUser}`)
               .pipe(
                 delay(1000),
                 map( resp => resp.user.links )
               )
  };

  getLinkByID( idLink: string ): Observable<Link> {
    return this.http.get<LinkResponse>(`${this._urlAPI}/links/${idLink}`)
               .pipe(
                 map( resp => resp.link )
               )
  };

  updateLink( idLink: string, linkUpdated: Link ): Observable<string> {
    return this.http.put<LinkResponse>(`${this._urlAPI}/links/${idLink}`, linkUpdated)
               .pipe(
                 map( resp => resp.message )
               )
  };


  // Todos los siguientes metodos se usan para crear un nuevo link y ahi mismo asignarlo a un usuario
  private postLink( newLink: Link ): Observable<string> {
    return this.http.post<LinkResponse>(`${this._urlAPI}/links`, newLink)
               .pipe(
                 map( resp => resp.link._id!)
               );
  };

  private assignCreatedLinkToUser( idLinkToAdd: string ): Observable<UserResponse> {
    const idUser = localStorage.getItem('fake_token');
    // creo un objeto del tipo {"link_id": "..."} porque así es como el api necesita la data (revisar DTOs de API)
    const dtoIdLinkToAdd = {
      link_id: idLinkToAdd
    };
    return this.http.put<UserResponse>(`${this._urlAPI}/users/addlink/${idUser}`, dtoIdLinkToAdd);
  };

  createLinkAndAssignItToUser( newLink: Link ) {
    return this.postLink(newLink)
                .pipe(
                    delay(1000),
                    switchMap( idLink => this.assignCreatedLinkToUser(idLink) ),
                    map( resp => resp.message )
                );
  };

  /* Todos los siguientes metodos se usan para 1° eliminar un link del array de links de un usuario y 2°
  eliminarlo del registro de links también */
  private removeLinkFromUser( idLinkToRemove: string ): Observable<string> {
    const idUser = localStorage.getItem('fake_token');
    // creo un objeto del tipo {"link_id": "..."} porque así es como el api necesita la data (revisar DTOs de API)
    const dtoIdLinkToRemove = {
      link_id: idLinkToRemove
    };

    return this.http.put<UserResponse>(`${this._urlAPI}/users/removelink/${idUser}`, dtoIdLinkToRemove)
               .pipe(
                 map( resp => resp.message )
               );
  };

  private deleteLink( idLinkToDelete: string ): Observable<string> {
    return this.http.delete<LinkResponse>(`${this._urlAPI}/links/${idLinkToDelete}`)
               .pipe(
                 map( resp => resp.message )
               );
  };

  deleteLinkFully( idLink: string ): Observable<[string, string]> {
    return combineLatest([ this.removeLinkFromUser(idLink), this.deleteLink(idLink) ]);
  };
}
