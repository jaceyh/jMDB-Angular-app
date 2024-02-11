import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
* Component for displaying movie details in a dialog.
*/
@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrl: './movie-details-dialog.component.scss'
})
export class MovieDetailsDialogComponent implements OnInit {

    /**
    * Constructor for MovieDetailsDialogComponent.
    * @param data The data containing movie details.
    */
    constructor (@Inject(MAT_DIALOG_DATA)
    public data: {
        Name: string;
        Description: string;
    }
    ) {}

    /**
    * Lifecycle hook that is called after data-bound properties of a directive are initialized.
    */
    ngOnInit(): void {    
    }

}
