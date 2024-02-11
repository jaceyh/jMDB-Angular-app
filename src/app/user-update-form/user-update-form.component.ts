import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Interface representing a user.
 */
type User = {
    _id?: string;
    username?: string;
    password?: string;
    email?: string;
    favoriteMovies?: [];
};

/**
 * Component for displaying a form to update user information.
 */
@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrl: './user-update-form.component.scss'
})

export class UserUpdateFormComponent implements OnInit {
    /** The user object. */
    user: User = {};

    /** Input data for the user. */
    @Input() userData = { Username: '', Password: '', Email: ''}

    /**
     * Constructor for the UserUpdateFormComponent.
     * @param fetchApiData Service for making API calls.
     * @param dialogRef Reference to the dialog opened by MatDialog.
     * @param snackBar Service to display snack-bar messages.
     * @param router Router service for navigation.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserUpdateFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router,
    ){}

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
        const user = this.getUser();
        console.log(user);

        if (!user._id) {
            this.router.navigate(['welcome']);
            return;
        }

        this.user = user;
        this.userData = {
            Username: user.username || '',
            Email: user.email || '',
            Password: '',
        };
    }

    /**
     * Method to get user data.
     * @returns The user data.
     */
    getUser(): User {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    /**
     * Method to update user information.
     */
    updateUser(): void {
        this.fetchApiData.updateUser(this.userData).subscribe((result)=> {
            console.log(result);
            localStorage.setItem('user', JSON.stringify(result));
            console.log(result);
            this.user = result;
            this.dialogRef.close();
            this.snackBar.open('User successfully updated.', 'OK', {
                duration: 2500
            });
            /** Successful update done */
            this.router.navigate(['profile']);
        }, (response) => {
            this.snackBar.open(response, 'OK', {
                duration: 2000
            });
        });
    }
}
