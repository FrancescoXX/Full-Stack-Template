import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Calendar } from '../model/Calendar';

@Injectable({ providedIn: 'root' })
export class CalendarReducerService {

  private initialCalendar: Calendar = {
    data: null,
    events: null,
    mindate: null,
    maxdate: null,
    startdate: null,
    enddate: null,
    hub: null,
    stopdate: null
  };

  private calendarTracker = new BehaviorSubject<Calendar>(this.initialCalendar);

  getCalendar = (): Observable<Calendar> => this.calendarTracker.asObservable();
  setCalendar = (updatedCalendar: Calendar): void => this.calendarTracker.next(updatedCalendar);
  resetState = (): void => this.calendarTracker.next(this.initialCalendar);
}
