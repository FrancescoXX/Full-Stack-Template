import { Component, OnInit } from '@angular/core';
import { OverviewService } from './overview.service';
import * as Utils from '../shared/Utils';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewPageComponent implements OnInit {

  private scihub_number_of_registered_users = 0;
  private colhub_number_of_registered_users_collaborative = 0;
  private colhub_number_of_registered_users_dhr = 0;

  private inthub_number_of_registered_users = 0;
  private cophub_number_of_registered_users = 0;

  private scihub_number_of_download = 0;
  private scihub_volume_of_download = 0;

  private colhub_number_of_download = 0; 
  private colhub_volume_of_download = 0;

  private inthub_number_of_download = 0;
  private inthub_volume_of_download = 0;

  private cophub_number_of_download = 0;
  private cophub_volume_of_download = 0;

  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    this.overviewService.getOverviewData().subscribe(
      data => {
        console.log('data is ', data[0]);
        const MODEL = data[0];
        this.scihub_number_of_registered_users = Utils.numberWithSpaces(MODEL.scihub_number_of_registered_users);
        this.colhub_number_of_registered_users_collaborative = MODEL.colhub_number_of_registered_users_collaborative;

        this.colhub_number_of_registered_users_dhr = MODEL.colhub_number_of_registered_users_dhr;
        this.inthub_number_of_registered_users = MODEL.inthub_number_of_registered_users;

        this.cophub_number_of_registered_users = Utils.numberWithSpaces(MODEL.cophub_number_of_registered_users);

        this.scihub_number_of_download = Utils.numberWithSpaces(MODEL.scihub_number_of_download);
        this.scihub_volume_of_download = Utils.numberWithSpaces(Utils.formatBytes(MODEL.scihub_volume_of_download, 1));

        this.colhub_number_of_download = Utils.numberWithSpaces(MODEL.colhub_number_of_download);
        this.colhub_volume_of_download = Utils.numberWithSpaces(Utils.formatBytes(MODEL.colhub_volume_of_download, 1));

        this.inthub_number_of_download = Utils.numberWithSpaces(MODEL.inthub_number_of_download);
        this.inthub_volume_of_download = Utils.numberWithSpaces(Utils.formatBytes(MODEL.inthub_volume_of_download, 1));

        this.cophub_number_of_download = Utils.numberWithSpaces(MODEL.cophub_number_of_download);
        this.cophub_volume_of_download = Utils.numberWithSpaces(Utils.formatBytes(MODEL.cophub_volume_of_download, 1));
      },
      error => {
        console.log('error:', error);
      }
    );
  }
}
