import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserSignIn } from './admin-login/UserSignIn';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public isAuth = false;
  public role: number = null;
  public token: any; // store token

  public BASE_URL = 'http://192.168.10.78:2000';

  usersUrl = `${this.BASE_URL}/users`;
  authUrl = `${this.BASE_URL}/auth/token`;

  secretUrl = '/books/mybook/';
  userSignIn = new BehaviorSubject<UserSignIn>(null);

  public mockUrl = '/assets/dev/mockuser.json';


  constructor(private http: HttpClient, private router: Router) { }

  // // Admin user
  // checkAdmin = () => {
  //   return this.http.get<any>(`${this.usersUrl}/1`) // ref
  //     .pipe(catchError(this.handleError), delay(1000));
  // }

  // collGs User
  checkCollGSUser = (username: string, password: string) => {
    
    console.log('mocking login...');
    // const aaa = {
    //   username:username,
    //   password:password
    // }

    // if (username == 'admin' && password == '123456'){
    //   return true;
    // } else {
    //   return false;
    // }
    // Mocking login
    return this.http
      .get<any>(this.mockUrl) // ref
      // .get<any>(`${this.usersUrl}/2`) // ref
      .pipe(catchError(this.handleError));
  }

  /**
   * Login. Returns a token if credentials are valid
   */
  login = (todo: any) => {
    return this.http
      .post<any>(this.authUrl, todo)
      .pipe(catchError(this.handleError), delay(1000), tap(resData => {
        this.handleAuthentication(resData);
      }));
  }

  logout = () => {
    console.log('logout on service');
    this.isAuth = false; // set logged status to true
    this.role = null;
    this.router.navigateByUrl('collgslogin');
  }

  handleAuthentication(resData: any) {
    this.token = resData.token; // Stores the token in auth service to make it globally available
    this.isAuth = true; // set logged status to true
    this.role = 0;
    this.router.navigate(['admin']);
  }

  /**
   * Request with token
   */
  getBookWithToken = () => {
    const THE_TOKEN = this.token;
    const HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${THE_TOKEN}`
      })
    };
    console.log('THE_TOKEN: ', THE_TOKEN);
    return this.http
      .get<any>(`${this.BASE_URL}${this.secretUrl}`, HEADERS)
      .pipe(catchError(this.handleError));
  }

  getAllCollGS() {
    return this.http
      .get<any>(`${this.usersUrl}`) // ref
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