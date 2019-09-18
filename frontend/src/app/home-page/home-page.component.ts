import { Component, Input, OnInit } from '@angular/core';
import { HomePageService } from './home-page.service';
import * as Util from '../shared/Utils';
import { HomePage } from './model/HomePage';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

// Ngrx
import { Store } from '@ngrx/store';
import * as HomePageActions from './store/home-page.actions';
import * as fromApp from '../store/app.reducer';
import { OverviewService } from '../overview/overview.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // Properties
  error: any;
  headers: string[];

  // @Input() carousel1 = new HomePage('test1', 'test2');

  txtMonthlyAvailability: any = 'txtMonthlyAvailability';
  txtPublishedProducts: any = 'txtPublishedProducts';
  txtRegisteredUsers: any = 'txtRegisteredUsers';
  txtUserDownloads: any = 'txtUserDownloads';
  partners = 0;

  // LEFT
  registeredUsers = Util.numberWithSpaces(100);
  publishedProducts = Util.numberWithSpaces(1000);
  volumeOfUsersDownloads = '1 Pb';
  openAccessHubAvaiability = '100';

  // Constructor
  constructor(
    private store: Store<fromApp.AppState>, // Store
    private homePageService: HomePageService,
    private overviewService: OverviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new HomePageActions.GetHomePageData('AAA'));
    forkJoin({
      homePageData: this.homePageService.getHomePageData(),
      overviewData: this.overviewService.getOverviewData(),
    }).subscribe(data => {
      const MODEL1: any = data.homePageData[0];
      const MODEL2: any = data.overviewData[0];

      // Home page Data
      this.volumeOfUsersDownloads = Util.formatBytes(MODEL1.volume_of_user_downloads, 1);
      this.registeredUsers = Util.numberWithSpaces(MODEL1.number_of_registered_users);
      this.publishedProducts = Util.numberWithSpaces(MODEL1.number_of_published_products);
      this.openAccessHubAvaiability = MODEL1.monthly_availability + '%';

      // Overview Data
      const COLLGS_USERS = MODEL2.colhub_number_of_registered_users_collaborative;
      const INTERNATIONAL_USERS = MODEL2.inthub_number_of_registered_users;
      this.partners = COLLGS_USERS + INTERNATIONAL_USERS;
    });
  }

  OnNavigatePage1(): void {
    this.router.navigateByUrl('page1');
  }

  carouselSlide(index: any): void {
    console.log('TODO ', index);
  }
}
