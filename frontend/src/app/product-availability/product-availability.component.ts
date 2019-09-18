import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-product-availability',
  templateUrl: './product-availability.component.html',
  styleUrls: ['./product-availability.component.css']
})
export class ProductAvailabilityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  //   function numberWithSpaces(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  
  // (function() {
  //     'use strict';
  
  //     var productnumber, maxnumprodperdate = 0;
  //     var hasProduct = false;
  //     var data = [];
  //     var events = [];
  //     var maxyear, minyear;
  //     var maxdate, mindate;
  //     var model;
  //     var monthGap;
  //     var selected_mission, selected_url, selected_events_url;
  //     var urlS1 = "api/page4_number_of_products_sensed_per_day_s1.json";
  //     var urlS2 = "api/page4_number_of_products_sensed_per_day_s2.json";
  //     var urlS3 = "api/page4_number_of_products_sensed_per_day_s3.json";
  //     var urlS5 = "api/page4_number_of_products_sensed_per_day_s5.json";
  //     var urlall = "api/page4_number_of_products_sensed_per_day_total.json";
  //     var urlEventsall = "api/events.json";
  
  //     Date.prototype.addDays = function(days) {
  //         var dat = new Date(this.valueOf());
  //         dat.setDate(dat.getDate() + days);
  //         return dat;
  //     }
  
  //     $(".S1").click(function() {
  
  //         $(".calendar-all").removeClass('active');
  //         $(".S2").removeClass('active');
  //         $(".S3").removeClass('active');
  //         $(".S5").removeClass('active');
  //         attached('Sentinel-1', urlS1, urlEventsall);
  //     });
  
  //     $(".S2").click(function() {
  
  //         $(".calendar-all").removeClass('active');
  //         $(".S1").removeClass('active');
  //         $(".S3").removeClass('active');
  //         $(".S5").removeClass('active');
  //         attached('Sentinel-2', urlS2, urlEventsall);
  //     });
  
  //     $(".S3").click(function() {
  
  //         $(".calendar-all").removeClass('active');
  //         $(".S2").removeClass('active');
  //         $(".S1").removeClass('active');
  //         $(".S5").removeClass('active');
  //         attached('Sentinel-3', urlS3, urlEventsall);
  
  
  //     });
  
  //     $(".S5").click(function() {
  
  //         $(".calendar-all").removeClass('active');
  //         $(".S2").removeClass('active');
  //         $(".S1").removeClass('active');
  //         $(".S3").removeClass('active');
  //         attached('Sentinel-5P', urlS5, urlEventsall);
  
  
  //     });
  
  //     $(".calendar-all").click(function() {
  
  //         $(".S3").removeClass('active');
  //         $(".S2").removeClass('active')
  //         $(".S1").removeClass('active')
  //         attached('all missions', urlall, urlEventsall);
  
  
  //     });
  
  //     $(window).on('login', function() {
  //         $(".calendar-all").click();
  //         attached(selected_mission, selected_url, selected_events_url);
  //     });
  
  
  //     /**
  //      *  Called after the element is attached to the document.
  //      *  Can be called multiple times during the lifetime of an element.
  //      *  The first 'attached' callback is guaranteed not to fire until after 'ready'
  //      *
  //      * @return {null}
  //      */
  //     function attached(mission, url, events_url) {
  //         selected_mission = mission;
  //         selected_url = url;
  //         selected_events_url = events_url
  //         maxnumprodperdate = 0;
  //         $('.calendar-date-detail').text('');
  //         var _model = {};
  //         httpManager.sendRequest("GET", selected_url).then(function(response) {
  //             _model.density = response.data;
  //             httpManager.sendRequest("GET", selected_events_url).then(function(response) {
  //                 _model.events = response.data;
  //                 model = _processModel(_model, selected_mission);
  //                 setNewModel(model);
  //                 minyear = new Date(mindate).getFullYear();
  //                 maxyear = new Date(maxdate).getFullYear();
  //                 if (productnumber > 0) {
  //                     if (maxyear - minyear == 0) {
  //                         drawCalendar(selected_mission, mindate, maxdate, "#calendar-content");
  //                     } else {
  //                         drawCalendar(selected_mission, mindate, minyear + "-12-31", "#calendar-content");
  //                         drawCalendar(selected_mission, maxyear + "-01-01", maxdate, "#calendar-content-curryear");
  //                     }
  //                     $(".calendar-info-date").text('click on a date for more details');
  //                 } else {
  //                     $("#calendar-content").html("");
  //                     $("#calendar-content-curryear").html("");
  //                     $(".calendar-info-date").html('<br>');
  
  //                 }
  //                 $('.max-product-number-per-date').text('');
  //                 $('.max-product-number-per-date').text(numberWithSpaces(maxnumprodperdate));
  //                 setBarColor(mission);
  //                 $('.calendar-title').attr('data-events-mission', selected_mission);
  //                 if (productnumber > 0) {
  //                     if (selected_mission.localeCompare('all missions') == 0) {
  //                         $('.calendar-title').text(numberWithSpaces(productnumber) + " Sentinel products published for sensing period: " + convertDate(model.startdate) + " to " + model.stopdate);
  
  //                     } else {
  //                         $('.calendar-title').text(numberWithSpaces(productnumber) + " " + selected_mission + " products published for sensing period: " + convertDate(model.startdate) + " to " + model.stopdate /* + " for " + model.mission*/ );
  //                     }
  //                 } else {
  //                     if (selected_mission.localeCompare('all missions') == 0) {
  //                         $('.calendar-title').text("No Sentinel products published for sensing period: " + convertDate(model.startdate) + " to " + model.stopdate);
  //                     } else {
  //                         $('.calendar-title').text("No " + selected_mission + " products published for sensing period: " + convertDate(model.startdate) + " to " + model.stopdate);
  //                     }
  //                 }
  //                 if (maxnumprodperdate > 0)
  //                     $('.calendar-legend').show();
  //                 else
  //                     $('.calendar-legend').hide();
  //             });
  //         });
  
  //     }
  
  
  
  
  //     function setProductCount(count) {
  //         productnumber = count
  //     }
  
  //     function setNewModel(model) {
  
  
  //         var specificModel = model;
  //         mindate = specificModel.mindate;
  //         maxdate = specificModel.maxdate;
  //         data = specificModel.data;
  //         events = specificModel.events;
  //         hasProduct = (productnumber > 0) ? true : false;
  
  
  //     }
  
  //     function getFirstColor(mission) {
  //         switch (mission) {
  //             case 'Sentinel-1':
  //                 return {
  //                     "R": 253,
  //                     "G": 200,
  //                     "B": 47
  //                 };
  //                 break;
  //             case 'Sentinel-2':
  //                 return {
  //                     "R": 0,
  //                     "G": 133,
  //                     "B": 66
  //                 };
  //                 break;
  //             case 'Sentinel-3':
  //                 return {
  //                     "R": 0,
  //                     "G": 152,
  //                     "B": 219
  //                 };
  //                 break;
  //             case 'Sentinel-5P':
  //                 return {
  //                     "R": 51,
  //                     "G": 0,
  //                     "B": 102
  //                 };
  //                 break;
  //             default:
  //                 return {
  //                     "R": 227,
  //                     "G": 114,
  //                     "B": 34
  //                 };
  //         }
  //     }
  
  //     function getSecondColor(mission) {
  //         switch (mission) {
  //             case 'Sentinel-1':
  //                 return {
  //                     "R": 254,
  //                     "G": 241,
  //                     "B": 202
  //                 };
  //                 break;
  //             case 'Sentinel-2':
  //                 return {
  //                     "R": 216,
  //                     "G": 236,
  //                     "B": 226
  //                 };
  //                 break;
  //             case 'Sentinel-3':
  //                 return {
  //                     "R": 205,
  //                     "G": 235,
  //                     "B": 248
  //                 };
  //                 break;
  //             case 'Sentinel-5P':
  //                 return {
  //                     "R": 204,
  //                     "G": 153,
  //                     "B": 255
  //                 };
  //                 break;
  //             default:
  //                 return {
  //                     "R": 250,
  //                     "G": 230,
  //                     "B": 216
  //                 };
  //         }
  //     }
  
  //     function setBarColor(mission) {
  //         var firstCol = getFirstColor(mission);
  //         var secondCol = getSecondColor(mission);
  //         $('.mission-bar').attr("style", function() {
  //             var firstGradient = "rgb(" + firstCol.R + "," + firstCol.G + "," + firstCol.B + ")";
  //             var secondGradient = "rgb(" + secondCol.R + "," + secondCol.G + "," + secondCol.B + ")";
  //             return "background: " + firstGradient + "; " +
  //                 "background: -o-linear-gradient(left," + firstGradient + "," + secondGradient + ");" +
  //                 "background: -moz-linear-gradient(left," + firstGradient + "," + secondGradient + ");" +
  //                 "background: linear-gradient(to left," + firstGradient + "," + secondGradient + ");";
  //         });
  //     }
  
  //     function computeGradient(d, mission) {
  
  //         var firstCol = getFirstColor(mission);
  //         var secondCol = getSecondColor(mission);
  
  //         var computedCol = "rgb(255,255,255)";
  //         if (d && d.amount) {
  //             var p = d.amount / (maxnumprodperdate);
  //             computedCol = "rgb(" + parseInt(firstCol.R * p + secondCol.R * (1 - p)) + "," + parseInt(firstCol.G * p + secondCol.G * (1 - p)) + "," + parseInt(firstCol.B * p + secondCol.B * (1 - p)) + ")";
  //         }
  //         return computedCol;
  
  //     }
  
  //     function convertDate(inputFormat) {
  //         function pad(s) {
  //             return (s < 10) ? '0' + s : s;
  //         }
  //         var d = new Date(inputFormat);
  //         return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-');
  //     }
  
  //     function drawCalendar(mission, start, end, element) {
  //         $(element).html("");
  
  //         var startdate, enddate, startyear, endyear, startmonth, endmonth, startday, endday;
  //         if (start && end) {
  //             startdate = new Date(start);
  //             enddate = new Date(end);
  //             startyear = startdate.getFullYear();
  //             startmonth = startdate.getMonth();
  //             startday = startdate.getDate();
  //             endyear = enddate.getFullYear();
  //             endmonth = enddate.getMonth();
  //             endday = enddate.getDate();
  
  //         } else {
  
  //             startyear = new Date().getFullYear();
  //             endyear = new Date().getFullYear();
  //             startmonth = 0;
  //             endmonth = 11;
  //             startday = 1;
  //             endday = 31;
  //             startdate = new Date(startyear, startmonth, startday);
  //             enddate = new Date(endyear, endmonth, endday);
  //         }
  
  //         var self = this;
  //         var cellSize = ($(window).width() > 500) ? 50 : 30;
  //         var paddingSize = 30,
  //             svgHeight = (endyear - startyear == 0) ? cellSize * 6 * (endmonth - startmonth + 1) : cellSize * 5 * 12,
  
  //             svgWidth = cellSize * 7 + (paddingSize * 2);
  
  //         var percent = d3.format(".1%"),
  //             day = d3.time.format("%w"),
  //             week = d3.time.format("%U"),
  //             format = d3.time.format("%Y-%m-%d");
  
  //         var color = d3.scale.quantize()
  //             .domain([-.05, .05])
  //             .range(d3.range(11).map(function(d) {
  //                 return "q" + d + "-11";
  //             }));
  //         var svg = d3.select(element).selectAll("svg")
  //             .data(d3.range(startyear, endyear + 1))
  //             .enter().append("svg")
  //             .attr("width", svgWidth)
  //             .attr("height", svgHeight)
  //             .attr("class", "RdYlGn svg-container calendar-page-column")
  //             .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
  //             .attr("style", "padding-top: 10px; margin:auto; ")
  //             .append("g")
  //             .attr("transform", "translate(" + paddingSize + ",25)");
  
  //         svg.append("text")
  //             .attr("transform", "translate(" + (svgWidth / 2 - paddingSize) + "," + -5 + ")")
  //             .attr("class", "calendar-year-label")
  //             .style("text-anchor", "middle")
  //             .text(function(d) {
  //                 return d;
  //             });
  
  
  //         var rect = svg.selectAll(".day")
  //             .data(function(d) {
  
  //                 if (endyear - startyear == 0) {
  //                     if (endmonth == 11 && endday == 31)
  //                         return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
  //                     else
  //                         return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
  //                 } else
  //                     return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
  //             })
  //             .enter().append("rect")
  //             .attr("stroke", "#000")
  //             .attr("class", "day")
  //             .attr("width", cellSize)
  //             .attr("height", cellSize)
  //             .attr("y", function(d) {
  //                 if (endyear - startyear == 0)
  //                     return (d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) * cellSize;
  //                 else
  //                     return week(d) * cellSize;
  //             })
  //             .attr("x", function(d) {
  //                 if (endyear - startyear == 0)
  //                     return d.getDay() * cellSize;
  //                 else
  //                     return day(d) * cellSize;
  //             })
  //             .datum(format)
  //             .attr("fill", function(d) {
  
  
  //                 return computeGradient(data[d], mission);
  //             })
  //             .attr("style", function(d) {
  //                 var cursor = "cursor: default;";
  //                 if (events[d]) {
  //                     cursor = "cursor: pointer;";
  //                 }
  //                 return cursor;
  
  
  //             })
  //             .on('click', function(d) {
  //                 var dateTitle = "No products published with sensing date " + convertDate(d);
  //                 if (data[d] && data[d].amount)
  //                     dateTitle = numberWithSpaces(data[d].amount) + ((data[d].amount > 1) ? " products" : " product") + " published with sensing date " + convertDate(d);
  //                 $('.calendar-date-detail').text(dateTitle);
  //                 $('.calendar-date-detail').attr('data-events-date', d);
  //                 $('.calendar-date-detail').attr('data-events-parent', 'product-availability');
  //                 if (events[d]) {
  //                     $('#events-container').modal('show');
  //                 }
  
  
  //             });
  
  //         var evt = svg.selectAll("image")
  //             .data(function(d) {
  //                 if (endyear - startyear == 0) {
  //                     if (endmonth == 11 && endday == 31)
  //                         return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
  //                     else
  //                         return d3.time.days(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
  //                 } else {
  //                     return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
  //                 }
  //             })
  //             .enter().append("svg:image")
  //             .attr("xlink:href", "images/info.png")
  //             .attr("y", function(d) {
  //                 if (endyear - startyear == 0)
  //                     return (d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) * cellSize /*+ parseInt(cellSize*0.4 )*/ ;
  //                 else
  //                     return week(d) * cellSize /*+ parseInt(cellSize*0.4 )*/ ;
  //             })
  //             .attr("x", function(d) {
  //                 if (endyear - startyear == 0)
  //                     return d.getDay() * cellSize /*+ parseInt(cellSize*0.4 )*/ ;
  //                 else
  //                     return day(d) * cellSize /*+ parseInt(cellSize*0.4 )*/ ;
  //             })
  //             .attr("class", function(d) {
  //                 if (!events[format(d)]) // Test icon placeholder. To replace with real event information
  //                     return "calendar-info-icon calendar-info-hide";
  //                 else
  //                     return "calendar-info-icon";
  //             })
  //             .attr("width", function() {
  //                 return cellSize - parseInt(cellSize * 0.6)
  //             })
  //             .attr("height", function() {
  //                 return cellSize - parseInt(cellSize * 0.6)
  //             })
  //             .datum(format)
  //             .on('click', function(d) {
  //                 //var dateTitle = d + ": No products sensed";
  //                 var dateTitle = "No products published with sensing date " + convertDate(d);
  //                 if (data[d] && data[d].amount)
  //                     dateTitle = numberWithSpaces(data[d].amount) + ((data[d].amount > 1) ? " products" : " product") + " published with sensing date " + convertDate(d);
  //                 $('.calendar-date-detail').text(dateTitle);
  //                 $('.calendar-date-detail').attr('data-events-date', d);
  //                 $('.calendar-date-detail').attr('data-events-parent', 'product-availability');
  //                 $('#events-container').modal('show')
  
  
  //             });
  
  
  
  
  //         rect.append("title")
  //             .text(function(d) {
  //                 var dateTitle = convertDate(d);
  //                 if (data[d] && data[d].amount)
  //                     dateTitle = numberWithSpaces(data[d].amount) + ((data[d].amount > 1) ? " products" : " product") + " published with sensing date " + convertDate(d);
  //                 return dateTitle;
  //             });
  
  
  //         svg.selectAll(".month")
  //             .data(function(d) {
  //                 if (endyear - startyear == 0)
  //                     if (endmonth == 11 && endday == 31)
  //                         return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear + 1, 0, 1));
  //                     else
  //                         return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
  //                 else
  //                     return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
  //             })
  //             .enter().append("path")
  //             .attr("class", "month")
  //             .attr("style", "fill: none; stroke: #000; stroke-width: 3px;")
  //             .attr("d", monthPath)
  //             .attr("transform", function(d) {
  //                 if (endyear - startyear == 0)
  //                     return "translate(0,-" + (d3.time.weekOfYear(startdate) * cellSize) + ")"
  //                 else
  //                     return "translate(0,-" + (d3.time.weekOfYear(d) * cellSize) + ")"
  //             });
  
  //         var month_titles = svg.selectAll(".month-title") // Jan, Feb, Mar and the whatnot
  //             .data(function(d) {
  //                 //return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
  //                 return d3.time.months(new Date(startyear, startmonth, startday), new Date(endyear, endmonth, endday));
  //             })
  //             .enter().append("text")
  //             .text(monthTitle)
  //             .attr("class", "month-title")
  //             //.attr("style", "font-size:12px;")
  //             .attr("y", function(d) {
  
  //                 if (endyear - startyear == 0)
  //                     return ((d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) + 1) * cellSize;
  //                 else
  //                     return (d3.time.weekOfYear(d) + 1) * cellSize;
  //             })
  //             .attr("x", "-5")
  //             .attr("d", monthPath)
  //             .attr("transform", function(d) {
  //                 if (endyear - startyear == 0)
  //                     return "rotate(-90,-5," + ((d3.time.weekOfYear(d) - d3.time.weekOfYear(startdate)) + 1) * cellSize + ")"
  //                 else
  //                     return "rotate(-90,-5," + ((d3.time.weekOfYear(d) + 1) * cellSize) + ")"
  //             });
  
  
  
  //         rect.filter(function(d) {
  //                 return d in data;
  //             })
  //             // .attr("class", function(d) {
  //             //   return "day " + color(data[d]); })
  //             .attr("class", "")
  //             .attr("fill", function(d) {
  //                 var greenGraduation = parseInt(data[d].amount / (productnumber) * 255);
  
  
  //                 return computeGradient(data[d], mission);
  //             })
  //             .select("title")
  //             .text(function(d) {
  //                 if (data[d] && data[d].amount)
  //                     return numberWithSpaces(data[d].amount) + ((data[d].amount > 1) ? " products" : " product") + " published with sensing date " + convertDate(d);
  //                 else
  //                     return "No products published with sensing date " + convertDate(d);
  //             });
  //     }
  
  //     function monthPath(t0) {
  
  //         var day = d3.time.format("%w"),
  //             week = d3.time.format("%U");
  
  
  //         //var cellSize = 50;
  //         var cellSize = ($(window).width() > 500) ? 50 : 30;
  //         var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
  //         var d0 = +day(t0),
  //             w0 = +week(t0),
  //             d1 = +day(t1),
  //             w1 = +week(t1);
  
  //         return "M" + d0 * cellSize + "," + (w0) * cellSize + "H" + 7 * cellSize + "V" + (w1) * cellSize + "H" + (d1 + 1) * cellSize + "V" + (w1 + 1) * cellSize + "H" + 0 + "V" + (w0 + 1) * cellSize + "H" + d0 * cellSize + "Z";
  //     }
  
  
  //     function monthTitle(t0) {
  //         var monthNames = ["January", "February", "March", "April", "May", "June",
  //             "July", "August", "September", "October", "November", "December"
  //         ];
  //         //return t0.toLocaleString("en-us", { month: "long" });
  //         return monthNames[t0.getMonth()];
  //     }
  
  //     function _formatDate(inputDate) {
  
  //         var dateappo = inputDate.replace("/Date(", "").replace(")/", "");
  
  //         var date = new Date(parseInt(dateappo));
  
  //         return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  //     }
  //     /**
  //      *  Private method used to process model from server
  //      *
  //      * @param {Object} modelFromServer: the response from server
  //      * @return {Promise}
  //      */
  //     function _processModel(modelFromServer, mission) {
  
  //         var genericModel = {},
  //             products = modelFromServer.density,
  //             allevents = modelFromServer.events,
  //             events = [],
  //             self = this;
  
  //         var date1 = new Date();
  //         var date2 = new Date();
  //         productnumber = 0;
  //         if (products) {
  //             var obj = {};
  //             var appo = [];
  //             var appo_evt = [];
  //             var obj_evt = {};
  //             for (var i = 0; i < products.length; i++) {
  //                 var entry = products[i];
  
  //                 var ingestionDate = entry.day; // _.findWhere(entry.Attributes.results, {Name:"Sensing
  //                 productnumber += parseInt(entry.number);
  //                 if (ingestionDate) {
  //                     var startdate = new Date(ingestionDate);
  //                     if (startdate < date1)
  //                         date1 = startdate;
  //                     if (obj[ingestionDate]) {
  //                         obj[ingestionDate].amount = (parseInt(obj[ingestionDate].amount) + parseInt(entry.number)) + "";
  
  //                     } else {
  //                         obj[ingestionDate] = {};
  //                         obj[ingestionDate].amount = parseInt(entry.number);
  //                     }
  //                 }
  //                 if (parseInt(entry.number) > maxnumprodperdate)
  //                     maxnumprodperdate = parseInt(entry.number)
  
  
  //             }
  //             appo.push(obj);
  //             var filteredEvents = []
  //             for (var j = 0; j < allevents.length; j++) {
  //                 if (!allevents[j].service || (allevents[j].service.localeCompare("false") == 0))
  //                     filteredEvents.push(allevents[j]);
  //             }
  //             if (mission.localeCompare('all missions') == 0) {
  //                 events = filteredEvents;
  //             } else {
  //                 for (var i = 0; i < filteredEvents.length; i++) {
  //                     var evt = filteredEvents[i];
  //                     if (evt.mission_tag && evt.mission_tag.indexOf(mission) >= 0) {
  //                         events.push(evt);
  //                     }
  //                 }
  //             }
  //             for (var i = 0; i < events.length; i++) {
  //                 var entry = events[i];
  
  //                 var startDate = new Date(moment.utc(entry.startdate).format('YYYY-MM-DD'));
  //                 var endDate = (entry.stopdate && entry.stopdate.length > 0) ? new Date(moment.utc(entry.stopdate).format('YYYY-MM-DD')) : new Date();
  //                 var currentDate = (startDate < date1) ? date1 : startDate;
  //                 var formatCurrDate;
  //                 while (currentDate <= endDate) {
  //                     formatCurrDate = currentDate.getFullYear() + "-" + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + ("0" + currentDate.getDate()).slice(-2);
  //                     //formatCurrDate = moment(currentDate).format('YYYY-MM-DD');
  //                     if (!obj_evt[formatCurrDate]) {
  //                         obj_evt[formatCurrDate] = {};
  //                     }
  //                     currentDate = currentDate.addDays(1);                    
  //                 }
  //                 if (date2 < endDate)
  //                     date2 = endDate;
  
  //             }
  //             appo_evt.push(obj_evt);
  //             genericModel.data = appo[0];
  //             genericModel.events = appo_evt[0];
  //             genericModel.mindate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + '-01';
  
  //             if (date2.getMonth() == 11)
  
  //                 genericModel.maxdate = date2.getFullYear() + "-12-31";
  //             else
  //                 genericModel.maxdate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 2)).slice(-2) + '-01';
  
  //             genericModel.startdate = date1.getFullYear() + "-" + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + ("0" + date1.getDate()).slice(-2);
  //             genericModel.enddate = date2.getFullYear() + "-" + ("0" + (date2.getMonth() + 1)).slice(-2) + '-' + ("0" + date2.getDate()).slice(-2);
  //             genericModel.mission = mission;
  //             genericModel.stopdate = moment.utc().subtract(1, 'days').format('DD-MM-YYYY');
  //             model = genericModel;
  
  
  //         }
  //         return genericModel;
  
  //     }
  
  
  //     attached('all missions', urlall, urlEventsall);
  
  
  
  
  
  
  
  // })();
  }

}
