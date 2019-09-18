import { Component } from '@angular/core';
import * as Utils from '../shared/Utils';
import { Page1Service } from './page1.service';
import { Router } from '@angular/router';

/* Models */
import { Page1 } from './Page1';
import { TitleValue } from '../shared/row-title-value/TitleValue';
import { Title } from '../shared/row-title/Title';

@Component({
  selector: 'app-page1',
  styleUrls: ['./page1.css'],
  templateUrl: './page1.component.html',
  providers: [Page1Service],
})
export class Page1Component {
  // Constants
  myTitle = new Title('Statistics from the Collaborative Ground Segment');

  // Dynamics
  child1 = new TitleValue('N/A', 'N/A');
  child2 = new TitleValue('N/A', 'N/A');
  page1: Page1; // Json model

  constructor(private page1Service: Page1Service, private router: Router) {
    this.page1Service.getJson()
      .subscribe((data: Page1) => {
        this.page1 = { ...data };

        const VOLUME_DOWNLOADS = Utils.formatBytes(this.page1.OverallVolumeofdownloads, 2).toString();
        const NUMBER_DOWNLOADS = Utils.numberWithSpaces((this.page1.OverallNumberofdownloads).toFixed(0)).toString();

        this.child1 = new TitleValue('Overall Volume of downloads', VOLUME_DOWNLOADS);
        this.child2 = new TitleValue('Overall Number of downloads', NUMBER_DOWNLOADS);
      });
  }

  toggleDropdown = () => {
    document.getElementById('page1Dropdown').classList.toggle('show');
    this.router.navigateByUrl('collgslogin');
    // window.onclick = function (event: any) {
    //   console.log('clicked!');
    //   if (!event.target.matches('.dropbtn')) {
    //   if (!event.target.matches('.dropbtn')) {
    //     console.log('dropped!');
    //     const dropdowns = document.getElementsByClassName('dropdown-content');
    //     for (let i = 0; i < dropdowns.length; i++) {
    //       const openDropdown = dropdowns[i];

    //       if (openDropdown.classList.contains('show')) {

    //         openDropdown.classList.remove('show');
    //       }
    //     }
    //   }
    // };
  }
}
