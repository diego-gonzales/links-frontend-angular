import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';


import { Link } from '../../interfaces/link-response.interface';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.css']
})
export class CardLinkComponent implements OnInit {

  @Input('linkChild') link!: Link;
  @Output() deletedLinkcito = new EventEmitter<string>();


  constructor( private linkService: LinkService ) { }

  ngOnInit(): void { }


  deleteLink() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.linkService.deleteLinkFully(this.link._id!)
            .subscribe( resp => {
              console.log(resp);
              this.deletedLinkcito.emit(this.link._id);

              Swal.fire({
                icon: 'success',
                title: resp[0],
                showConfirmButton: false,
                timer: 1000
              });

            }, (err) => {
              console.log(err);
            });

      }
    })
  };

}
