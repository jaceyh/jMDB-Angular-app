import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'

/**
 * Base URL for the API that provides data for the client application.
 */
const apiUrl = 'https://jmdb.herokuapp.com/';

/**
 * Injectable service that interacts with the API to fetch and manage data.
 *
 * @remarks
 * Marked as `@Injectable({ providedIn: 'root' })` to make it available as a singleton across the application.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
    /**
    * Injects the HttpClient module, making it available for API calls within the service via this.http
    *
    * @param http - The HttpClient instance for making HTTP requests.
    */
    constructor(private http: HttpClient) { }
    
    /**
    * Makes a POST request to the user registration endpoint to register a new user.
    *
    * @param userDetails - The user details to be registered, including username, password, email and birthdate.
    * @returns An Observable emitting the registered user object or an error response.
    */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
    * Makes a POST request to the user login endpoint to login the user.
    *
    * @param userDetails - The user details required for login, username and password.
    * @returns An Observable emitting the registered user object or an error response, user routed to movies page.
    */
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'login', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
    * Fetches a list of all movies from the API.
    *
    * @returns An Observable emitting an array of movie objects or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get<any>(apiUrl + 'movies', {
            headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
  
    /**
    * Fetches a movie object based on its name from the API.
    *
    * @param name - The name of the movie to retrieve.
    * @returns An Observable emitting the movie object or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    getMovie(name: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.post<any>(apiUrl + 'movies/', name, {
            headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
    * Fetches a director object based on its name from the API.
    *
    * @param directorName - The name of the director to retrieve.
    * @returns An Observable emitting the director object or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    getDirector(directorName: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.post<any>(apiUrl + 'director/', directorName, {
            headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
    * Fetches a tag object based on its name from the API.
    *
    * @param tagName - The name of the tae to retrieve.
    * @returns An Observable emitting the tag object or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    getTag(tagName: any): Observable<any> {
        const token = localStorage.getItem('token');
        console.log(tagName);
        return this.http.post<any>(apiUrl + 'movies/tags/', tagName, {
            headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }


    /**
    * Retrieves the currently logged-in user information from local storage.
    *
    * @returns An Observable containing the user object or an empty object if not found.
    * 
    * @private
    */
    getUser(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user;
    }

    /**
    * Fetches the user's favorite movies from the API.
    *
    * @returns An Observable emitting an array of the user's favorite movies or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    getFavMovies(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token')
        return this.http.get(apiUrl + 'users/' + user.Username, { 
            headers: new HttpHeaders(
                {
                Authorization: 'Bearer ' + token,
                })
            }).pipe(
            map(this.extractResponseData),
            map((data) => data.FavMovies),
            catchError(this.handleError)
        );
    }

    /**
    * Adds a movie to the user's favorite movies list and updates the server.
    *
    * @param movieId - The ID of the movie to add to the user's favorites.
    * @returns An Observable emitting a confirmation message or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    addFavMovie(movieId: string): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        user.FavMovies.push(movieId);
        localStorage.setItem('user', JSON.stringify(user));
        return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, null, { 
            headers: new HttpHeaders(
                {
                Authorization: 'Bearer ' + token,
                }),
            responseType: "text"
            }).pipe(
                <any>(this.extractResponseData),
                catchError(this.handleError)
        );
    }

    public isFavMovie(movieId: string): boolean {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.FavMovies.indexOf(movieId) >= 0;
    }

    /**
    * Updates the user's information on the server.
    *
    * @param updatedUser - The updated user object containing new values.
    * @returns An Observable emitting the updated user object or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    updateUser(updatedUser: any): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('User object inside updateUser:', user);

        const token = localStorage.getItem('token')

        return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, { headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
            })
        }).pipe(
            <any>(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
    * Deletes the currently logged-in user's account from the server.
    *
    * @returns An Observable emitting a confirmation message or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    deleteUser(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token')
        return this.http.delete(apiUrl + 'users/' + user.Username, { headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
            })
        }).pipe(
            <any>(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
    * Removes a movie from the user's favorite movies list on the server and updates the local storage.
    *
    * @param movieID - The ID of the movie to remove from favorites.
    * @returns An Observable emitting a confirmation message or an error response.
    *
    * @throws HttpErrorResponse - If the API request fails.
    */
    deleteFavMovie(movieID: any): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        user.FavMovies.splice(movieID);
        localStorage.setItem('user', JSON.stringify(user));
        return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/delete/' + movieID, {
            headers: new HttpHeaders(
                {
                Authorization: 'Bearer ' + token,
                }),
            responseType: "text"
        }).pipe(
            <any>(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
    * Extracts the response data from a network response object.
    *
    * @private
    * @param res - The response object obtained from an HTTP request.
    * @returns The extracted data object or an empty object if no data exists.
    */
    private extractResponseData(res: Response): any {
        const body = res;
        return body || {};
    }

    /**
    * Handles HTTP error responses, logs error details, and re-throws a generic error message.
    *
    * @private
    * @param error - The HttpErrorResponse object representing the error.
    * @returns An Observable that throws a generic error message.
    */
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occured:', error.error.message);
        } else {
            console.error(`Error Status Code ${error.status}, ` + `Error body is: ${error.error}`);
        }
        return throwError(
            () => new Error ('Something bad happened; please try again later.'));
    }
}
