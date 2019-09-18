import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  public BASE_URL = 'http://192.168.10.78:2000';

  usersUrl = `${this.BASE_URL}/users`;
  authUrl = `${this.BASE_URL}/auth/token`;
  secretUrl = '/books/mybook/';

  userSignIn = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getOverviewData = () => {
    return this.http
      .get<any>('../../assets/api/page2_number_of_registered_users_per_hub.json')
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.log('handlind error...');
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }
}
