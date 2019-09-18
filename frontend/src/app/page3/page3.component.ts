import { Component, OnInit } from '@angular/core';
import * as Utils from '../shared/Utils';
import { Page3Service } from './page3.service';

/** Models */
import { Page3 } from './Page3';
import { Title } from '../shared/row-title/Title';
import { TitleValue } from '../shared/row-title-value/TitleValue';
import { SubTitle } from '../shared/sub-title/SubTitle';
import { Dougnut } from '../shared/row-doughnut/Doughnut';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html'
})
export class Page3Component implements OnInit {
  postfixTitle = 'CollGS - Overall Statistics';
  collGs = 'Italy';
  myTitle = new Title(this.collGs + ' ' + this.postfixTitle);

  subtitle1 = new SubTitle('Active users trends');
  subtitle2 = new SubTitle('User download profile');

  child1 = new TitleValue('N/A', 'N/A');
  child2 = new TitleValue('N/A', 'N/A');

  doughnut1 = new Dougnut();


  public numberOfDownloads = 10;

  private page3: Page3;
  constructor(private page3Service: Page3Service, private authService: AuthService) {
    this.numberOfDownloads = this.page3Service.orbital_period;
  }

  ngOnInit() {
    console.log('this.numberOfDownloads', this.numberOfDownloads);
    // this.numberOfDownloads = this.page3Service.orbital_period;
    this.child1 = new TitleValue('Number Of Downloads', this.numberOfDownloads.toString());
    this.child2 = new TitleValue('Active users', (this.numberOfDownloads * 2).toString());
  }

  getBookWithToken() {
    console.log('will get a book with token...', this.authService.token);

    this.page3Service.getBookWithToken()
      .subscribe((data: any) => {
        console.log('DATA: ', data);
      });
    //User service , which will have the auth service injected to fo requests with token
  }
}
