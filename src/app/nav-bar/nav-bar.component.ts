import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component for displaying navigation bar
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
    constructor(
        public fetchApiData: FetchApiDataService,
        public router: Router
    ){}

/**
 * Method for logging the user out
 * @returns user and token removed from local storage
 * @returns user navigated to welcome page
 */
  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
