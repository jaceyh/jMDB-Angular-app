import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component'

/**
 * Component for displaying user profile information.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {
    /** The user object. */
    user: any = {};
    /** Array to store movies. */
    movies: any[] = [];
    /** Array to store favorite movies. */
    FavMovies: any[] = [];

    /** Input data for the user. */
    @Input() userData = {Username: '', Password: '', Email: '', Birthdate: '', FavMovies: [] };

    /**
     * Constructor for the UserProfileComponent.
     * @param fetchApiData Service for making API calls.
     * @param router Router service for navigation.
     * @param dialog MatDialog service for opening dialogs.
     * @param snackBar Service to display snack-bar messages.
     * @param expansionPanel MatExpansionModule for expansion panel.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public expansionPanel: MatExpansionModule,
    ) { }

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
        this.getProfile();
    }

    /**
     * Method to get user data.
     * @returns The user data.
     */
    getUser(): void {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }


    /**
     * Method to populate user information.
     */
    getProfile(): void {
        this.user = this.fetchApiData.getUser();
        this.userData.Username = this.user.Username;
        this.userData.Password = this.user.Password;
        this.userData.Email = this.user.Email;
        this.userData.Birthdate = this.user.Birthdate;
        this.fetchApiData.getAllMovies().subscribe((response) => {
            this.FavMovies = response.filter((movie: any) => this.user.FavMovies.includes(movie._id));
        });
    }

    /**
     * Method to get all movies.
     * @returns The array of movies.
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }


    /**
     * Method to get the user's favorite movies.
     */
    getFavMovies(): void {
        this.user = this.fetchApiData.getUser();
        this.userData.FavMovies = this.user.FavMovies;
        this.FavMovies = this.user.FavMovies;
        console.log('Fav Movies in getFavMovie', this.FavMovies);
    }

    /**
     * Method to check if a movie is a favorite of the user.
     * @param movie The movie object.
     * @returns True if the movie is a favorite, false otherwise.
     */
    isFav(movie: any): any {
        const MovieID = movie._id;
        if (this.FavMovies.some((movie) => movie === MovieID)) {
          return true;
        } else {
          return false;
        }
    }

    /**
     * Method to remove a movie from favorites.
     * @param movieId The ID of the movie to remove.
     */
    removeFav(movieId: any): void {
        this.fetchApiData.deleteFavMovie(movieId).subscribe(
          () => {
            this.snackBar.open('Removed from favorite list', 'OK', {
              duration: 2000
            });
            this.getProfile();
          }
        )
    }



    /**
     * Method to open the dialog for updating user information.
     */
    openUpdateUserDialog(): void {
        this.dialog.open(UserUpdateFormComponent, {
            width: '280px'
        });
    }

    /**
     * This method will delete the user's account
     * @returns confirmation prompt
     * @returns user's account deleted
     * @returns user navigated to welcome page
     * @returns user notified of success
     * @returns user notified of error
     * @returns user token and user details removed from local storage
     */

    deleteUser(): void {
        if(confirm('Are you sure you want to permanently delete your account?')) {
            this.router.navigate(['welcome']).then(() => {
                localStorage.clear();
                this.snackBar.open('Your account has been deleted', 'OK', {
                    duration: 3000
                });
            })
            this.fetchApiData.deleteUser().subscribe((result) => {
                console.log(result);
            });
        }
    }
}