import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying director information in a dialog.
 */
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})
export class DirectorDialogComponent implements OnInit {
    /**
     * Constructor for DirectorDialogComponent.
     * @param data The data containing director information.
     */
    constructor(@Inject(MAT_DIALOG_DATA)
    public data: {
        Name: string;
        Bio: string;
        Birthdate: string;
      }
    ) {}

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
    }
}
