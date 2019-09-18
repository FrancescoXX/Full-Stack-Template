import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';
import * as $ from 'jquery';
import * as d3 from 'd3';
import * as moment from 'moment';

import * as Util from '../shared/Utils';

import { ServerModel } from './model/ServerModel';
import { Calendar } from './model/Calendar';
import { Hub } from './model/Hub';
import { HubReducerService } from './store/hub.reducer.service';

import { ModalService } from '../shared/modal/modal.service';
import { CalendarReducerService } from './store/calendar.reducer.service';
import { tap } from 'rxjs/operators';

// Ngrx
import { Store } from '@ngrx/store';
import * as LegacyAvailabilityActions from './store/availability.actions';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit, OnDestroy {

  // CONFIGURATION
  readonly urlScihub91 = '../../assets/api/subpage_availability_per_day_scihub_91_days.json';
  readonly urlInthub91 = '../../assets/api/subpage_availability_per_day_inthub_91_days.json';
  readonly urlColhub91 = '../../assets/api/subpage_availability_per_day_colhub_91_days.json';
  readonly urlCophub91 = '../../assets/api/subpage_availability_per_day_cophub_91_days.json';
  readonly events_url = '../../assets/api/events.json';
  readonly color_availability_95_100 = 'rgba(0, 133, 66, 1)';
  readonly color_availability_90_95 = 'rgba(253, 200, 47, 1)';
  readonly color_availability_under90 = 'rgba(227, 114, 34, 1)';
  readonly mapping = {
    'scihub': 'Scientific Data Hub',
    'inthub': 'International Access Hub',
    'colhub': 'Collaborative Data Hub',
    'cophub': 'Copernicus Services Hub'
  };
  readonly selectHubMapping = {
    1: {
      id: 1,
      hub: 'scihub',
      title: 'Copernicus Open Access Hub',
      url: this.urlScihub91
    },
    2: {
      id: 2,
      hub: 'colhub',
      title: 'Collaborative Hub',
      url: this.urlColhub91
    },
    3: {
      id: 3,
      hub: 'inthub',
      title: 'International Hub',
      url: this.urlInthub91
    },
    4: {
      id: 4,
      hub: 'cophub',
      title: 'Copernicus Services Hub',
      url: this.urlCophub91
    }
  };

  //ngrx
  hubSelected: any = null;
  ngrxSubscription: Subscription;

  // STATE MANAGEMENT
  model: Calendar; // MODEL to render

  currentHub: Hub;
  hubSub: Subscription;

  currentCalendar: Calendar;
  calendarSub: Subscription;

  // PROPERTIES
  mapped_selected_hub: any;
  selected_hub_title = 'Copernicus Open Access Hub';
  mindate: string;
  maxdate: string;
  data: any;
  events: any;
  wHeight: number = window.innerHeight;
  wWidth: number = window.innerWidth;
  monthGap: any;
  productnumber: any;
  resizeTimeout: any = 1000;
  testevents: any;
  eventDescription: any;
  allevents: any;
  eventTitle: any;
  newStarDate: string;
  newEndDate: string;
  category: any;
  externalurl: any;

  constructor(
    private store: Store<fromApp.AppState>, // Store
    private http: HttpClient,
    private modalService: ModalService,
    private hubReducerService: HubReducerService,
    private calendarReducerService: CalendarReducerService
  ) { }

  /**
   * @UIHOOK
   * Select an Hub from the GUI
   */
  OnSelectHub = (hubId: number): void => {
    this.store.dispatch(new LegacyAvailabilityActions.SelectHub(hubId));
  }

  /**
   * @Procedure // Helper method to do thing imperatively
   * - Contains only chainable methods, can end with a Procedure
   * - has return type: void
   */
  CallSelectHub = (id: number): void => {
    this
      ._ReduceHubById(id)
      ._UpdateUISyncById(id)
      .CallUpdateCalendarByHub(this.currentHub);
  }

  /**
   * @Chainable return this (Angular Component)
   * Reduces the state of the Current Hub based on a number
   */
  _ReduceHubById = (hubId: number): AvailabilityComponent => {
    this.currentHub = this.mapAssign(this.selectHubMapping, hubId);
    this.updateHub(this.currentHub);
    return this;
  }

  /**
   * @Chainable return this (Angular Component)
   * Update UI of the component Sync, by the id passed
   */
  _UpdateUISyncById = (id: number): AvailabilityComponent => {
    this.resetLabels();
    this.selected_hub_title = this.currentHub.title;
    switch (id) {
      case 1:
        $('.scihub').css('background-color', '#0099e6');
        $('.scihub').css('color', '#F6F6F6');
        $('.avail-hub-title').css('color', '#0099e6');
        break;
      case 2:
        $('.colhub').css('background-color', '#822433');
        $('.colhub').css('color', '#F6F6F6');
        $('.avail-hub-title').css('color', '#822433');
        break;
      case 3:
        $('.inthub').css('background-color', '#339933');
        $('.inthub').css('color', '#F6F6F6');
        $('.avail-hub-title').css('color', '#339933');
        break;
      case 4:
        $('.cophub').css('background-color', '#ff9933');
        $('.cophub').css('color', '#F6F6F6');
        $('.avail-hub-title').css('color', '#ff9933');
        break;
      default:
        break;
    }
    return this;
  }

  /**
   * @Procedure Contains just chainable methods and has return type: void
   * With the new state, Updates the Component properties and show the Right Calendar
   */
  CallUpdateCalendarByHub = (selectedHub: Hub) => {
    $('.avail-calendar-date-detail').text('');
    forkJoin({
      selected: this.http.get(selectedHub.url),
      events: this.http.get(this.events_url),
    }).subscribe(s => {
      const serverModel = new ServerModel(s.selected, s.events);
      this.mapped_selected_hub = this.mapAssign(this.mapping, selectedHub.hub);
      this
        ._ProcessModel(serverModel, this.mapped_selected_hub)
        ._setNewModel(this.model)
        ._RenderModel(this.model);
    });
  }

  /**
   * @Chainable return this (Angular Component)
   * Get the model from the server, and processes it creating the model for the component
   * ...SWITCHMAP
   */
  _ProcessModel = (modelFromServer: ServerModel, hub: string): AvailabilityComponent => {
    const genericModel = {
      data: {},
      events: {},
      mindate: {},
      maxdate: {},
      startdate: {},
      enddate: {},
      hub: {},
      stopdate: {}
    };
    const products = modelFromServer.availability;
    this.allevents = modelFromServer.events;
    const events = [];
    let date1 = new Date();
    let date2 = new Date();
    const productnumber = 0;
    if (products) {
      const obj = {};
      const appo = [];
      const appo_evt = [];
      const obj_evt = {};

      for (let i = 0; i < products.length; i++) {
        const entry = products[i];
        const ingestionDate = entry.day; // _.findWhere(entry.Attributes.results, {Name:"Sensing
        if (ingestionDate) {
          const startdate = new Date(ingestionDate);
          if (startdate < date1) {
            date1 = startdate;
          }
          if (obj[ingestionDate]) {
            obj[ingestionDate].amount = (obj[ingestionDate].amount) + (entry.availability) + '';

          } else {
            obj[ingestionDate] = {};
            obj[ingestionDate].amount = (entry.availability);
          }
        }
      }
      appo.push(obj);
      const filteredEvents = [];
      for (let j = 0; j < this.allevents.length; j++) {
        if (this.allevents[j].service && (this.allevents[j].service.localeCompare('true') === 0)) {
          filteredEvents.push(this.allevents[j]);
        }
      }
      for (let i = 0; i < filteredEvents.length; i++) {
        const evt = filteredEvents[i];
        if (evt.hub_tag && ((evt.hub_tag.length === 1 && evt.hub_tag[0] == null) || evt.hub_tag.indexOf(hub) >= 0)) {
          events.push(evt);
        }
      }
      for (let i = 0; i < events.length; i++) {
        const entry = events[i];
        const startDate = new Date(moment.utc(entry.startdate).format('YYYY-MM-DD'));
        const endDate = (entry.stopdate && entry.stopdate.length > 0) ?
          new Date(moment.utc(entry.stopdate).format('YYYY-MM-DD')) : new Date();
        let currentDate = (startDate < date1) ? date1 : startDate;
        let formatCurrDate: string;
        while (currentDate <= endDate) {
          formatCurrDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2)
            + '-' + ('0' + currentDate.getDate()).slice(-2);
          if (!obj_evt[formatCurrDate]) {
            obj_evt[formatCurrDate] = {};
          }
          const dat = new Date(currentDate.valueOf());
          dat.setDate(dat.getDate() + 1);
          currentDate = dat;
        }
        if (date2 < endDate) {
          date2 = endDate;
        }
      }
      this.testevents = events;

      appo_evt.push(obj_evt);
      genericModel.data = appo[0];
      genericModel.events = appo_evt[0];
      genericModel.mindate = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-01';
      if (date2.getMonth() === 11) {
        genericModel.maxdate = date2.getFullYear() + '-12-31';
      } else {
        genericModel.maxdate = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 2)).slice(-2) + '-01';
      }
      genericModel.startdate = date1.getFullYear() + '-' + ('0' +
        (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);
      genericModel.enddate = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + ('0' + date2.getDate()).slice(-2);
      genericModel.hub = hub;
      genericModel.stopdate = moment.utc().subtract(1, 'days').format('DD-MM-YYYY');
      this.model = genericModel;
    }
    this.model = genericModel;
    return this;
  }

  /**
   * @Chainable return this (Angular Component)
   * Set New Model
   */
  _setNewModel = (availabilityModel: Calendar): AvailabilityComponent => {
    this.mindate = availabilityModel.mindate;
    this.maxdate = availabilityModel.maxdate;
    this.data = availabilityModel.data;
    this.events = availabilityModel.events;
    // Update calendar UI
    $('.avail-calendar-title')
      .attr('data-events-hub', this.mapped_selected_hub)
      .text('availability from ' + this.convertDate(this.model.startdate) + ' to ' + this.model.stopdate);
    return this;
  }

  /**
  * @Chainable return this (Angular Component)
  * Render a Model
  */
  _RenderModel = (c: Calendar): AvailabilityComponent => {
    this.updateCalendar(c);
    const minyear = new Date(c.mindate).getFullYear();
    const maxyear = new Date(c.maxdate).getFullYear();
    if (this.wHeight > this.wWidth) {
      if (maxyear - minyear === 0) {
        this.drawCalendar(c.mindate, c.maxdate, '#avail-calendar-content');
      } else {
        this.drawCalendar(c.mindate, minyear + '-12-31', '#avail-calendar-content');
        this.drawCalendar(maxyear + '-01-01', c.maxdate, '#avail-calendar-content-curryear');
      }
    } else if (maxyear - minyear === 0) {
      this.drawCalendarH(c.mindate, c.maxdate, '#avail-calendar-content-horizontal');
    } else {
      this.drawCalendarH(c.mindate, minyear + '-12-31', '#avail-calendar-content-horizontal');
      this.drawCalendarH(maxyear + '-01-01', c.maxdate, '#avail-calendar-content-horizontal-curryear');
    }
    return this;
  }

  drawCalendarH = (start: string, end: string, element: string): any => {
    $('#avail-calendar-content').html('');
    $('#avail-calendar-content-curryear').html('');
    $(element).html('');
    let startdate: Date;
    let enddate: Date;
    let startyear: number;
    let endyear: number;
    let startmonth: number;
    let endmonth: number;
    let startday: number;
    let endday: number;

    if (start && end) {
      startdate = new Date(start);
      enddate = new Date(end);
      startyear = startdate.getFullYear();
      endyear = enddate.getFullYear();
      startmonth = startdate.getMonth();
      endmonth = enddate.getMonth();
      startday = startdate.getDate();
      endday = enddate.getDate();
    } else {
      startyear = new Date().getFullYear();
      endyear = new Date().getFullYear();
      startmonth = 0;
      endmonth = 11;
      startday = 1;
      endday = 31;
      startdate = new Date(startyear, startmonth, startday);
      enddate = new Date(endyear, endmonth, endday);
    }
    this.monthGap = startmonth;
    const cellSize = ($(window).width() > 900) ? 50 : 30;
    const paddingSize = 30;
    const svgHeight = cellSize * 7 + (paddingSize * 3);
    const svgWidth = (endyear - startyear === 0) ? cellSize * 6 * (endmonth - startmonth + 1) + (paddingSize) : cellSize * 5 * 16;
    const percent = d3.format('.1%');
    const day = d3.time.format('%w');
    const week = d3.time.format('%U');
    const format = d3.time.format('%Y-%m-%d');

    const color = d3.scale
      .quantize()
      .domain([-.05, .05])
      .range(d3.range(11).map((d) => 'q' + d + '-11'));

    const svg = d3.select(element).selectAll('svg')
      .data(d3.range(startyear, endyear + 1))
      .enter().append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'RdYlGn svg-container-avail calendar-page-column')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr('style',
        `padding-top: 10px;
        margin:auto;
        background-color:green;
        background-color: #fdfdfd;
        -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        `)
      .append('g')
      .attr('transform', () => {
        return 'translate(' + 30 + ', ' + 30 * 2 + ')';
      });

    svg.append('text')
      .attr('transform', () => {
        if (endyear - startyear === 0) {
          return 'translate(' + (svgWidth / 2 - paddingSize * 2) + ', -25)';
        } else {
          return 'translate(' + (paddingSize * 2) + ', -25)';
        }
      })
      .attr('class', 'avail-calendar-year-label')
      .style('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(d => d);

    const rect = svg.selectAll('.avail-day')
      .data(d => {
        if (endyear - startyear === 0) {
          if (endmonth === 11 && endday === 31) {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
          } else {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
          }
        } else {
          return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        }
      })
      .enter().append('rect')
      .attr('stroke', '#000')
      .attr('class', 'avail-day')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', function (d) {
        if (endyear - startyear === 0) {
          return (d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) * cellSize;
        } else {
          return this.week(d) * cellSize;
        }
      })
      .attr('y', function (d) {
        if (endyear - startyear === 0) {
          return d.getDay() * cellSize;
        } else {
          return this.day(d) * cellSize;
        }
      })
      .datum(format)
      .attr('fill', d => this.computeColor(this.data[d]))
      .attr('style', d => this.events[d] ? 'cursor: pointer;' : 'cursor: default;')
      .on('click', d => {
        $('.calendar-date-detail').text('');
        $('.calendar-date-detail').attr('data-events-date', d);
        $('.calendar-date-detail').attr('data-events-parent', 'service-availability');
        if (this.events[d]) {
          for (let i = 0; i < this.allevents.length; i++) {
            const evt = this.allevents[i];
            const startDate = moment.utc(this.allevents[i].startdate).format('YYYY-MM-DD');
            const endDate = (this.allevents[i].stopdate && this.allevents[i].stopdate.length > 0) ?
              moment.utc(this.allevents[i].stopdate).format('YYYY-MM-DDTHH:mm:ss.SSS') : moment.utc().format('YYYY-MM-DD');
            const newStarDate = moment.utc(this.allevents[i].startdate).format('YYYY-MM-DD');
            const newEndDate = moment.utc(this.allevents[i].endDate).format('YYYY-MM-DD');
            if (d === newStarDate) {
              console.log('Match!', evt);
              this.category = evt.category;
              this.newStarDate = newStarDate;
              this.newEndDate = newEndDate;
              this.eventTitle = evt.title;
              this.eventDescription = evt.description;
              this.externalurl = evt.externalurl;
            }
          }
          this.openModal('custom-modal-1');
        }
      });

    svg.selectAll('image')
      .data(function (d) {
        if (endyear - startyear === 0) {
          if (endmonth === 11 && endday === 31) {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
          } else {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
          }
        } else {
          return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        }
      })
      .enter().append('svg:image')
      .attr('xlink:href', '../../assets/images/info.png')
      .attr('x', function (d) {
        if (endyear - startyear === 0) {
          return (d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) * cellSize;
        } else {
          return this.week(d) * cellSize;
        }
      })
      .attr('y', function (d) {
        if (endyear - startyear === 0) {
          return d.getDay() * cellSize;
        } else {
          return this.day(d) * cellSize;
        }
      })
      .attr('style', d => (!this.events[format(d)]) ? 'display:none;' : 'display:show;cursor:pointer')
      .attr('width', () => cellSize - cellSize * 0.6)
      .attr('height', () => cellSize - cellSize * 0.6)
      .datum(format)
      .on('click', d => {
        $('.calendar-date-detail').text('');
        $('.calendar-date-detail').attr('data-events-date', d);
        $('.calendar-date-detail').attr('data-events-parent', 'service-availability');
        $('#events-container').modal('show');
      });

    rect.append('title')
      .text(d => this.convertDate(d));

    svg.selectAll('.avail-month')
      .data((d) => {
        if (endyear - startyear === 0) {
          if (endmonth === 11 && endday === 31) {
            return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
          } else {
            return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
          }
        } else {
          return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        }
      })
      .enter().append('path')
      .attr('class', 'avail-month')
      .attr('style', 'fill: none; stroke: #000; stroke-width: 3px;')
      .attr('d', this.monthPathH)
      .attr('transform', d => {
        if (endyear - startyear !== 0) { return; }
        return 'translate(-' + (d3.time.weekOfYear(startdate) * cellSize) + ',0)';
      });

    svg.selectAll('.avail-month-title')
      .data(d => d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday)))
      .enter().append('text')
      .text(this.monthTitle)
      .attr('class', 'avail-month-title')
      .attr('x', d => {
        if (endyear - startyear === 0) {
          return ((d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) + 1) * cellSize;
        } else {
          return (d3.time.weekOfYear(d) + 1) * cellSize;
        }
      })
      .attr('y', '-5')
      .attr('d', this.monthPathH)
      .style('font-size', '14px')
      .style('font-weight', 'bold');

    rect
      .filter(d => d in this.data)
      .attr('class', '')
      .attr('fill', d => this.computeColor(this.data[d]));
  }

  drawCalendar = (start: string, end: string, element: string): any => {
    $(element).html('');
    $('#avail-calendar-content-horizontal').html('');
    $('#avail-calendar-content-horizontal-curryear').html('');

    let startdate: Date, enddate: Date, startyear: number, endyear: number,
      startmonth: number, endmonth: number, startday: number, endday: number;
    if (start && end) {
      startdate = new Date(start);
      enddate = new Date(end);
      startyear = startdate.getFullYear();
      endyear = enddate.getFullYear();
      startmonth = startdate.getMonth();
      endmonth = enddate.getMonth();
      startday = startdate.getDate();
      endday = enddate.getDate();
    } else {
      startyear = new Date().getFullYear();
      endyear = new Date().getFullYear();
      startmonth = 0;
      endmonth = 11;
      startday = 1;
      endday = 31;
      startdate = new Date(startyear, startmonth, startday);
      enddate = new Date(endyear, endmonth, endday);
    }
    this.monthGap = startmonth;

    const cellSize = ($(window).width() > 600) ? 50 : 30;
    const paddingSize = 30,
      svgHeight = (endyear - startyear === 0) ? cellSize * 6 * (endmonth - startmonth + 1) : cellSize * 5 * 12,
      svgWidth = cellSize * 7 + (paddingSize * 2);

    const percent = d3.format('.1%'),
      day = d3.time.format('%w'),
      week = d3.time.format('%U'),
      format = d3.time.format('%Y-%m-%d');

    const color = d3.scale.quantize()
      .domain([-.05, .05])
      .range(d3.range(11).map(function (d) {
        return 'q' + d + '-11';
      }));

    const svg = d3.select(element).selectAll('svg')
      .data(d3.range(startyear, endyear + 1))
      .enter().append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'RdYlGn svg-container calendar-page-column')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr(
        'style',
        `padding-top: 10px;
        margin:auto;
        background-color:green;
        background-color: #fdfdfd;
        -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        `)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', 'translate(' + paddingSize + ',25)');

    svg.append('text')
      .attr('transform', 'translate(' + (svgWidth / 2 - paddingSize) + ',' + -5 + ')')
      .attr('class', 'avail-calendar-year-label')
      .style('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(d => d);

    const rect = svg.selectAll('.avail-day')
      .data(function (d) {
        if (endyear - startyear === 0) {
          if (endmonth === 11 && endday === 31) {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
          } else {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
          }
        } else {
          return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        }
      })
      .enter().append('rect')
      .attr('stroke', '#000')
      .attr('class', 'avail-day')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('y', function (d) {
        if (endyear - startyear === 0) {
          return (d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) * cellSize;
        } else {
          return this.week(d) * cellSize;
        }
      })
      .attr('x', function (d) {
        if (endyear - startyear === 0) {
          return d.getDay() * cellSize;
        } else {
          return this.day(d) * cellSize;
        }
      })
      .datum(format)
      .attr('fill', d => {
        return this.computeColor(this.data[d]);
      })
      .attr('style', d => {
        let cursor = 'cursor: default;';
        if (this.events[d]) {
          cursor = 'cursor: pointer;';
        }
        return cursor;

      })
      .on('click', d => {
        $('.calendar-date-detail').text('');
        $('.calendar-date-detail').attr('data-events-date', d);
        $('.calendar-date-detail').attr('data-events-parent', 'service-availability');
        if (this.events[d]) {
          $('#events-container').modal('show');
        }
      });

    const evt = svg.selectAll('image')
      .data(function (d) {
        if (endyear - startyear === 0) {
          if (endmonth === 11 && endday === 31) {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
          } else {
            return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
          }
        } else {
          return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        }
      })
      .enter().append('svg:image')
      .attr('xlink:href', '../../assets/images/info.png')
      .attr('y', function (d) {
        if (endyear - startyear === 0) {
          return (d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) * cellSize;
        } else {
          return this.week(d) * cellSize;
        }
      })
      .attr('x', function (d) {
        if (endyear - startyear === 0) {
          return d.getDay() * cellSize;
        } else {
          return this.day(d) * cellSize;
        }
      })
      .attr('style', d => (!this.events[format(d)]) ? 'display:none;' : 'display:show;cursor:pointer')
      .attr('width', () => cellSize - cellSize * 0.6)
      .attr('height', () => cellSize - cellSize * 0.6)
      .datum(format)
      .on('click', function (d) {
        $('.calendar-date-detail').text('');
        $('.calendar-date-detail').attr('data-events-date', d);
        $('.calendar-date-detail').attr('data-events-parent', 'service-availability');
        $('#events-container').modal('show');
      });

    rect.append('title')
      .text((d) => {
        const dateTitle = this.convertDate(d);
        return dateTitle;
      });

    svg.selectAll('.avail-month')
      .data(function (d) {
        if (endyear - startyear === 0) {
          if (endmonth === 11 && endday === 31) {
            return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
          } else {
            return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
          }
        } else {
          return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
        }
      })
      .enter().append('path')
      .attr('class', 'avail-month')
      .attr('style', 'fill: none; stroke: #000; stroke-width: 3px;')
      .attr('d', this.monthPath)

      .attr('transform', function (d) {
        if (endyear - startyear === 0) {
          return 'translate(0,-' + (d3.time.weekOfYear(startdate) * cellSize) + ')';
        } else {
          return;
        } // "translate(0,-" + (d3.time.weekOfYear(d) * cellSize) + ")"
      });

    const month_titles = svg.selectAll('.avail-month-title') // Jan, Feb, Mar and the whatnot
      .data(d => d3.time
        .months(
          new Date(startyear, startmonth, startday),
          new Date(endyear, endmonth, endday))
      )
      .enter().append('text')
      .text(this.monthTitle)
      .attr('class', 'avail-month-title')
      .attr('y', d => {
        if (endyear - startyear === 0) {
          return ((d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) + 1) * cellSize;
        } else {
          return (d3.time.weekOfYear(d) + 1) * cellSize;
        }
      })
      .attr('x', '-5')
      .attr('d', this.monthPath)
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .attr('transform', d => {
        if (endyear - startyear === 0) {
          return 'rotate(-90,-5,' + ((d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) + 1) * cellSize + ')';
        } else {
          return 'rotate(-90,-5,' + ((d3.time.weekOfYear(d) + 1) * cellSize) + ')';
        }
      });

    rect
      .filter(d => d in this.data)
      .attr('class', '')
      .attr('fill', d => this.computeColor(this.data[d])
      );
  }

  // LIFECYCLE HOOKS
  ngOnInit() {

    this.AllSubscriptions(); // Rxjs
    forkJoin({
      urlScihub91: this.http.get(this.urlScihub91),
      urlInthub91: this.http.get(this.urlInthub91),
      urlColhub91: this.http.get(this.urlColhub91),
      urlCophub91: this.http.get(this.urlCophub91),
      events_url: this.http.get(this.events_url),
    }).subscribe(() => {
      this.OnSelectHub(1);
    });

    //NgRX
    this.ngrxSubscription = this.store
      .select('availability')
      .subscribe(stateData => {
        console.log('820 stateData: ', stateData);
        this.CallSelectHub(stateData.selecthubIndex)
      });
  }

  ngOnDestroy(): void {
    this.hubSub.unsubscribe();
    this.calendarSub.unsubscribe();
    this.ngrxSubscription.unsubscribe();
  }

  // UTILS
  resetLabels = (): void => {
    $('.scihub').css('background-color', '#F6F6F6');
    $('.scihub').css('color', '#0099e6');
    $('.inthub').css('background-color', '#F6F6F6');
    $('.inthub').css('color', '#339933');
    $('.colhub').css('background-color', '#F6F6F6');
    $('.colhub').css('color', '#822433');
    $('.cophub').css('background-color', '#F6F6F6');
    $('.cophub').css('color', '#ff9933');
  }

  mapAssign = (mapObj: any, key: any): any => mapObj[key];

  computeColor = (d: { amount: string; }): string => {
    let computedCol = 'rgb(255,255,255)';
    if (d && d.amount) {
      if (parseInt(d.amount, 10) < 90) {
        computedCol = this.color_availability_under90;
      } else if (parseInt(d.amount, 10) < 95 && parseInt(d.amount, 10) >= 90) {
        computedCol = this.color_availability_90_95;
      } else {
        computedCol = this.color_availability_95_100;
      }
    }
    return computedCol;
  }

  monthPathH(t0: Date) {
    const day = d3.time.format('%w');
    const week = d3.time.format('%U');
    const cellSize = ($(window).width() > 900) ? 50 : 30;
    const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0),
      w0 = +week(t0),
      d1 = +day(t1),
      w1 = +week(t1);
    return 'M' + (w0 + 1) * cellSize + ',' + (d0) * cellSize + 'H' + w0 * cellSize + 'V' + 7 * cellSize + 'H' +
      (w1) * cellSize + 'V' + (d1 + 1) * cellSize + 'H' + (w1 + 1) * cellSize + 'V' + 0 + 'H' + (w0 + 1) * cellSize + 'Z';
  }

  monthPath(t0: Date) {
    const day = d3.time.format('%w');
    const week = d3.time.format('%U');
    const cellSize = ($(window).width() > 500) ? 50 : 30;
    const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0),
      w0 = +week(t0),
      d1 = +day(t1),
      w1 = +week(t1);
    return 'M' + d0 * cellSize + ',' + (w0) * cellSize + 'H' + 7 * cellSize + 'V' + (w1) * cellSize + 'H' + (d1 + 1)
      * cellSize + 'V' + (w1 + 1) * cellSize + 'H' + 0 + 'V' + (w0 + 1) * cellSize + 'H' + d0 * cellSize + 'Z';
  }

  monthTitle = (t0: any) => Util.MONTHS[t0.getMonth()];

  convertDate = (inputFormat: any): any => {
    function pad(s: any) {
      return (s < 10) ? '0' + s : s;
    }
    const d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-');
  }

  // Modal
  openModal = (modalId: string): void => this.modalService.open(modalId);
  closeModal = (modalId: string): void => this.modalService.close(modalId);

  // RXJS
  // Subscriptions
  AllSubscriptions = () => {
    this.hubSub = this.hubReducerService.getHub()
      // .pipe(tap(a => console.log('hubSub:', a)))
      .subscribe(
        res => this.currentHub = res,
        err => console.error(`An error occurred in hubSub: ${err.message}`)
      );

    this.calendarSub = this.calendarReducerService.getCalendar()
      // .pipe(tap(a => console.log('calendarSub:', a)))
      .subscribe(
        res => this.currentCalendar = res,
        err => console.error(`An error occurred in calendarSub: ${err.message}`)
      );
  }

  // Hub State Management
  updateHub = (newHub: Hub): void => {
    this.hubReducerService.setHub(newHub);
  }
  resetHub = (): void => this.hubReducerService.resetState();

  // Calendar State Management
  updateCalendar = (newCalendar: Calendar): void => this.calendarReducerService.setCalendar(newCalendar);
  resetCalendar = (): void => this.calendarReducerService.resetState();
}
