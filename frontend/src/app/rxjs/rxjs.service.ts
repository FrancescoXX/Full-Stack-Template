import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject, from } from 'rxjs';
/**
 * Service to perform a http request to server and storee response in a service
 */
@Injectable({ providedIn: 'root' })
export class RxjsService {

  private BASE_URL = 'http://192.168.10.78:2000'

  serverURL = `${this.BASE_URL}/dev/version`;
  usersUrl = `${this.BASE_URL}/users`;
  singleUserUrl = `${this.BASE_URL}/users`; // TEMP
  authUrl = `${this.BASE_URL}/auth/token`;

  public rxjsValue: any;
  rxjsValueChanged = new Subject<any[]>();

  public versionValue = "asd";
  BS_VersionChanged = new BehaviorSubject<string>("bs");

  constructor(private http: HttpClient) { }


  getVersion = () => {
    return this.http.get<any>(this.serverURL)
      .pipe(
        catchError(this.handleError),
        delay(2000));
  }

  getToken = (todo: any) => {
    return this.http.post<any>(this.authUrl, todo)
      .pipe(
        catchError(this.handleError));
  }

  getAllUsers = () => {
    return this.http.get<any>(this.usersUrl)
      .pipe(
        catchError(this.handleError),
        delay(2000));
  }

  getOneUser = (userId) => {
    return this.http.get<any>(`${this.singleUserUrl}/${userId}`)
      .pipe(
        catchError(this.handleError));
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
