import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HomePage } from './model/HomePage';

/**
 * Service to get a json form an url
 */@Injectable({ providedIn: 'root' })
export class HomePageService implements OnInit {
  homePageUrl = '../../assets/api/page1_volume_of_downloads_number_of_published_registered_users_availability.json';
  homePageData = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getHomePageData().subscribe((data: any) => {
      this.homePageData = data[0];
    });
  }

  getHomePageData = () => {
    return this.http
      .get<HomePage>(this.homePageUrl)
      .pipe(catchError(this.handleError));
  }

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
