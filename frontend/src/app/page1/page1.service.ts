import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

/*Models*/
import { Page1 } from './Page1';

/**
 * Service to get a json form an url
 */
@Injectable({ providedIn: 'root' })
export class Page1Service {
  page1Url = '../../assets/dev/page1.json'; // replace with json

  constructor(private http: HttpClient) { }

  getJson = () => {
    return this.http.get<Page1>(this.page1Url).pipe(catchError(this.handleError));
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
