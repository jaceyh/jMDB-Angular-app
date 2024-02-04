// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements OnInit{

    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<RegistrationFormComponent>,
        public snackBar: MatSnackBar) { }
    
    ngOnInit(): void {
    }

    // This is the function responsible for sending the form inputs to the backend
    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
            // Logic for a successful user registration goes here! (To be implemented)
        
            console.log(response);
            this.dialogRef.close(); // This will close the modal on success!
     
            this.snackBar.open('User registered successfully!', 'OK', {
                duration: 2000
            });
         }, (response) => {
            this.snackBar.open(response, 'OK', {
                duration: 2500
            });
        });
    }

}
