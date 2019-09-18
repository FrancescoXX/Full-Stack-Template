import { Component } from '@angular/core';
import * as Utils from '../shared/Utils';
import { Page2Service } from './page2.service';
import { Page2 } from './Page2';
import { Title } from '../shared/row-title/Title';
import { TitleValue } from '../shared/row-title-value/TitleValue';
import { SubTitle } from '../shared/sub-title/SubTitle';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  providers: [Page2Service],
})
export class Page2Component {

  postfixTitle = 'CollGS - Overall Statistics';
  collGs = 'Italy';

  myTitle = new Title( this.collGs + ' ' +  this.postfixTitle);
  subtitle1 = new SubTitle('Number of products downloaded per Sentinel');
  subtitle2 = new SubTitle('Volume of products downloaded per Sentinel');
  subtitle3 = new SubTitle('Archive exploitation ratio');

  private page2: Page2;
  private registeredUsers = 'N/A';
  private exploitationRatio = 'N/A';
  // private totalDownloaded = 'N/A';
  private perSentinelTotal = 'N/A';

  private NumberOfRegisteredUsers = 'N/A';
  private TotalDownloaded = 'N/A';
  private VolumeDownloaded = 'N/A';

  child1 = new TitleValue('N/A', 'N/A');
  child2 = new TitleValue('N/A', 'N/A');
  child3 = new TitleValue('N/A', 'N/A');

  constructor(private page2Service: Page2Service) {
    this.page2Service.getJson()
      .subscribe((data: Page2) => {
        this.page2 = { ...data };
        console.log('page2: ', this.page2);
        this.UpdateUI();
      });
  }

  UpdateUI() {
    this.exploitationRatio = (this.page2.propb).toFixed(0).toString();
    this.TotalDownloaded = (this.page2.propc / 1000000).toFixed(0).toString();
    this.perSentinelTotal = (this.page2.propd).toFixed(0).toString();

    this.child1 = new TitleValue('Number Of Registered Users', (6555).toString());
    this.child2 = new TitleValue('Volume of products', Utils.formatBytes((this.page2.propc), 2).toString());
    this.child3 = new TitleValue('Total number of downloads', this.page2.propa.toString());
  }
}
