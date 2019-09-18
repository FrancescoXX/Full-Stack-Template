import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';

// Service for admin uilities eg create new collgs
@Injectable({ providedIn: 'root' })
export class AdminService {

  public BASE_URL = 'http://192.168.10.78:2000';
  adminUrl = `${this.BASE_URL}/users`;

  constructor(private http: HttpClient, private authService: AuthService) { 
    // this.BASE_URL = this.authService.BASE_URL;
  }

  createCollGS = (collGS: any) => {
    return this.http.post<any>(this.adminUrl, collGS)
      .pipe(
        catchError(this.handleError),
        delay(1000));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
