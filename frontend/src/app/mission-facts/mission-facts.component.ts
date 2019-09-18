import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'app-mission-facts',
  templateUrl: './mission-facts.component.html',
  styleUrls: ['./mission-facts.component.css']
})
export class MissionFactsComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    // sentinel-1

    $("#mission-facts-sentinel-1-button").click(() => {
      this.openModal('custom-modal-1');
      // Show modal

      // $('#disseminationstats-dialog').attr('mission', 'Sentinel-1');
      // $('#disseminationstats-dialog').attr('mission-icon', 'images/sentinels/s-1a_black.png');
      // $('#disseminationstats-container').modal('show');
      // $("#top-countries-per-downloads-tab-button").css('display', 'inline-block');
    });

    // sentinel-2
    $("#mission-facts-sentinel-2-button").click(() => {
      this.openModal('custom-modal-1')
      // $('#disseminationstats-dialog').attr('mission', 'Sentinel-2');
      // $('#disseminationstats-dialog').attr('mission-icon', 'images/sentinels/s-2a_black.png');
      // $('#disseminationstats-container').modal('show');
      // $("#top-countries-per-downloads-tab-button").css('display', 'inline-block');
    })

    // sentinel-3
    $("#mission-facts-sentinel-3-button").click(() => {
      this.openModal('custom-modal-1')
      // $('#disseminationstats-dialog').attr('mission', 'Sentinel-3');
      // $('#disseminationstats-dialog').attr('mission-icon', 'images/sentinels/sentinel-3.png');
      // $('#disseminationstats-container').modal('show');
      // $("#top-countries-per-downloads-tab-button").css('display', 'inline-block');
    })

    // sentinel-5
    $("#mission-facts-sentinel-5-button").click(() => {
      this.openModal('custom-modal-1')
      // $('#disseminationstats-dialog').attr('mission', 'Sentinel-5P');
      // $('#disseminationstats-dialog').attr('mission-icon', 'images/sentinels/sentinel5p.png');
      // $('#disseminationstats-container').modal('show');
      // $("#top-countries-per-downloads-tab-button").css('display', 'none');
    })



    $(window).trigger('resize');
  }

  OnSelectMission = (missionCase: number): void => {
    console.log('Selected mission: ', missionCase);
    this.openModal('custom-modal-1');
  }

  openModal = (modalId: string): void => this.modalService.open(modalId);
  closeModal = (modalId: string): void => this.modalService.close(modalId);
}
