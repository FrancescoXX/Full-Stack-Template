import { Injectable, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Page3 } from './Page3';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

/**
 * Service to get a json form an url
 */
@Injectable({ providedIn: 'root' })
export class Page3Service {
  page1Url = 'https://swapi.co/api/planets/3'; // replace with json url
  public page3Value: any;
  page3ValueChanged = new Subject<any[]>();

  public orbital_period = 100;
  orbital_periodChanged = new Subject<number>();

  secretUrl = 'http://192.168.10.78:2000/books/mybook/';

  constructor(private http: HttpClient, private authService: AuthService) {
    // console.log('page3 - constructor called');
    this.getJson().subscribe((data: any) => {
      this.page3Value = { ...data };
      this.page3ValueChanged.next(this.page3Value);

      this.orbital_period = this.page3Value.orbital_period;
      this.orbital_periodChanged.next(this.orbital_period);
      console.log("Athis.orbital_period UPDATED: ", this.orbital_period);

    });
  }

  getJson = () => this.http.get<Page3>(this.page1Url).pipe(catchError(this.handleError));

  getConfigResponse = (): Observable<HttpResponse<Page3>> => {
    return this.http.get<Page3>(
      this.page1Url, {
        observe: 'response'
      });
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

  getBookWithToken = () => {
    const THE_TOKEN = this.authService.token;
    console.log('THE_TOKEN: ', THE_TOKEN);
    return this.http.get<any>(this.secretUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${THE_TOKEN}`
      })
    })
      .pipe(
        catchError(this.handleError),
        delay(2000));
  }
}
