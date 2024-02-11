import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for displaying a registration form.
 */
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements OnInit{

    /** Input data for the user. */
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

    /**
     * Constructor for the RegistrationFormComponent.
     * @param fetchApiData Service for making API calls.
     * @param dialogRef Reference to the dialog opened by MatDialog.
     * @param snackBar Service to display snack-bar messages.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<RegistrationFormComponent>,
        public snackBar: MatSnackBar) { }
    
    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
    }

    /**
     * Method to register a user.
     * Sends the form inputs to the backend for user registration.
     */
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
