import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying tag details in a dialog.
 */
@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrl: './tag-dialog.component.scss'
})
export class TagDialogComponent implements OnInit {

    /**
     * Constructor for TagDialogComponent.
     * @param data The data containing tag details.
     */
    constructor(@Inject(MAT_DIALOG_DATA)
    public data: [{
        Name: string;
        Description: string;
    },
    { 
        Name: string;
        Description: string;
    }]
    ) {}

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {    
    }
}
