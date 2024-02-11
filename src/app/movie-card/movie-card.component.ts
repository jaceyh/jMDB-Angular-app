import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/** Import accessible components */
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

/**
 * Component for displaying movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent {
    /** Array to store movies. */
    movies: any[] = [];
    /** Array to store favorite movies. */
    favorites: any[] = [];
    /** User object. */
    user: any = {}

    /**
     * Constructor for the MovieCardComponent.
     * @param fetchApiData Service for making API calls.
     * @param snackBar Service to display snack-bar messages.
     * @param router Router service for navigation.
     * @param dialog MatDialog service for opening dialogs.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        public router: Router,
        public dialog: MatDialog
        ) { }
  
    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
        this.getMovies();
    }
  
    /**
     * Method to fetch all movies.
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
      });
    }

    /**
     * Method to open a dialog displaying movie details.
     * @param Name The name of the movie.
     * @param Description The description of the movie.
     */
    getMovieDetails(Name: string, Description: string): void {
        this.dialog.open(MovieDetailsDialogComponent, {
            data: {
                Name: Name,
                Description: Description,
            }
        })

    }

    /**
     * Method to open a dialog displaying director details.
     * @param Name The name of the director.
     * @param Bio The biography of the director.
     */
    getDirector(Name: string, Bio: string): void {
        this.dialog.open(DirectorDialogComponent, {
          data: {
            Name: Name,
            Bio: Bio,
          },
          width: '400px',
        });
    }

    /**
     * Method to open a dialog displaying tag details.
     * @param Name The name of the tag.
     * @param Description The description of the tag.
     * @param Name2 The name of the second tag.
     * @param Description2 The description of the second tag.
     */
    getTag(Name: string, Description: string, Name2: string, Description2: string): void {
        this.dialog.open(TagDialogComponent, {
            data: [{
                Name: Name,
                Description: Description,
            },{
                Name: Name2,
                Description: Description2,
            }]
        })
    }

    /**
     * Method to get user data.
     * @returns The user data.
     */
    getUser(): void {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }


    /** 
     * Method to Get and set favorite movies selected by the user
     * @returns favorite movies selected by user
     */
    getFavMovies(): void {
        this.user = this.fetchApiData.getUser();
        this.fetchApiData.getAllMovies().subscribe((response) => {
            console.log(response);
            if (response.user && response.user.FavMovies) {
                this.favorites = response.user.FavMovies;
            } else {
                this.favorites = []; // set empty array if data is null
            }
        }, 
        (error: any) => {
            console.error('Error fetching user data:', error);
            this.favorites = []; // set empty array on error
        }
        );
    }

    /**
     * Method to check if a movie is a user's favorite.
     * @param movieId The ID of the movie.
     * @returns True if the movie is a favorite, false otherwise.
     */
    isFavoriteMovie(movieId: string): boolean {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.FavMovies.indexOf(movieId) >= 0;
    }

    /**
     * Method to add a movie to favorites.
     * @param movieId The ID of the movie.
     */
    addFavorite(movieId: string): void {
        // movie is already a favorite movie, remove it
        if (this.isFavoriteMovie(movieId)) {
            this.removeFavorite(movieId);
        } else {
            this.fetchApiData.addFavMovie(movieId).subscribe(() => {
                this.snackBar.open('Added to favorite list', 'OK', {
                    duration: 2000
                })
                this.fetchApiData.getAllMovies();
            })             
        }
    }

    /**
     * Method to remove a movie from favorites.
     * @param movieId The ID of the movie.
     */
    removeFavorite(movieId: any): void {
        this.fetchApiData.deleteFavMovie(movieId).subscribe(
          () => {
            this.snackBar.open('Removed from favorite list', 'OK', {
              duration: 2000
            });
            this.fetchApiData.getAllMovies();
          }
        )
    }
}
