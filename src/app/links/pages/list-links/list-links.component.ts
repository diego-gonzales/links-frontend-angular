import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LinkService } from '../../services/link.service';
import { Link } from '../../interfaces/link-response.interface';

@Component({
  selector: 'app-list-links',
  templateUrl: './list-links.component.html',
  styleUrls: ['./list-links.component.css']
})
export class ListLinksComponent implements OnInit {

  linksOfUser: Link[] = [];
  areThereLinks: boolean = true;

  constructor( private linkService: LinkService,
               private router: Router ) { }

  ngOnInit(): void {

    this.linkService.getLinksOfUser()
        .subscribe( resp => {
          if (resp.length === 0) this.areThereLinks = false;
          console.log(resp);
          this.linksOfUser = resp;
        }, (err) => {
          // este error puede ocurrir cuando se elimina el token o se modifica (en este caso el id del user simula el token)
          // PODEMOS AGREGAR UN CanActivate a cada ruta de este modulo para verificar si no se ha modifcado el token
          console.log(err);
        })
  };


  removeDeletedLinkFromArray( event: string ) {
    this.linksOfUser = this.linksOfUser.filter( link => link._id !== event );
  };

}
