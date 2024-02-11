import { Component, OnInit } from '@angular/core';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component for displaying the welcome page.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
    /**
    * Constructor for the WelcomePageComponent.
    * @param dialog MatDialog service for opening dialogs.
    */
    constructor(public dialog: MatDialog) { }

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
    }

    /**
     * Method to open the registration dialog.
     * This method is triggered when the signup button is clicked.
     */ 
    openUserRegistrationDialog(): void {
        this.dialog.open(RegistrationFormComponent, {
            width: '280px'
        });
    }
    /**
     * Method to open the login dialog.
     * This method is triggered when the login button is clicked.
     */
    openUserLoginDialog(): void {
        this.dialog.open(LoginFormComponent, {
            width: '280px'
        });
    }
}
