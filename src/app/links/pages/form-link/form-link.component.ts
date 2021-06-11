import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { LinkService } from '../../services/link.service';
import { Link } from '../../interfaces/link-response.interface';
import { closeSpinnerOfSweetAlert, showSuccessMessage, showSpinnerOfSweetAlert } from '../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-form-link',
  templateUrl: './form-link.component.html',
  styleUrls: ['./form-link.component.css']
})
export class FormLinkComponent implements OnInit {

  link!: Link;

  myForm: FormGroup = this.fb.group({
    title:       [ '', [Validators.required] ],
    url:         [ '', [Validators.required] ],
    description: [ '', [Validators.required] ]
  });


  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               private linkService: LinkService,
               private fb: FormBuilder ) { }

  ngOnInit(): void {

    if ( this.router.url.includes('update') ) {
      this.activatedRoute.params
          .pipe(
            switchMap( params => this.linkService.getLinkByID(params['idLink']) )
          ).subscribe( resp => {
            this.link = resp;
            this.myForm.reset({
              title: resp.title,
              url: resp.url,
              description: resp.description
            });
          }, (err) => {
            this.router.navigate(['/favorite-links/list'])
          })
    };

  };


  submitForm() {

    const { title, url, description } = this.myForm.value;

    if (this.myForm.invalid || title.trim() === '' || url.trim() === '' || description.trim() === '') {
      return;
    };

    showSpinnerOfSweetAlert('Saving...');

    const linkcito: Link = {
      title: title.trim(),
      url: url.trim(),
      description: description.trim()
    };

    if (!this.link) {
      this.linkService.createLinkAndAssignItToUser(linkcito)
          .subscribe( resp => {
            closeSpinnerOfSweetAlert();
            showSuccessMessage(resp);
            this.router.navigate(['/favorite-links/list']);
          }, (err) => console.log(err));

    } else {
      console.log(linkcito, this.link._id);
      this.linkService.updateLink(this.link._id!, linkcito)
          .subscribe( resp => {
            closeSpinnerOfSweetAlert();
            showSuccessMessage(resp);
            this.router.navigate(['/favorite-links/list']);
          }, (err) => console.log(err));
    };

  };

}
