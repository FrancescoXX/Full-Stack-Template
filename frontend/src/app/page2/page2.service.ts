import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Page2 } from './Page2';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { Subject } from 'rxjs/Subject';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Service to get a json form an url
 */
@Injectable()
export class Page2Service {
  page1Url = '../../assets/dev/page2.json'; // replace with json url

  private testState: Page2;

  constructor(private http: HttpClient) { }



  getJson = () => {
    return this.http
    .get<Page2>(this.page1Url)
    .pipe(catchError(this.handleError));
  }

  getConfigResponse = (): Observable<HttpResponse<Page2>> => {
    return this.http.get<Page2>(
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
}
