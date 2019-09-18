import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { AvailabilityComponent } from './availability.component';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as LegacyAvailabilityActions from './store/availability.actions';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appResizer]'
})
export class ResizerDirective implements OnInit {

  ngrxSubscription: Subscription;

  ngOnInit(): void {
    this.ngrxSubscription = this.store
      .select('availability')
      .subscribe(stateData => {
        console.log('20 resizer should call resize action: ', stateData);
      });
  }

  constructor(
    private el: ElementRef,
    private parentCmp: AvailabilityComponent,
    private store: Store<fromApp.AppState>
  ) { }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.el.nativeElement.resizeTimeout) {
      clearTimeout(this.el.nativeElement.resizeTimeout);
    }
    this.el.nativeElement.resizeTimeout = setTimeout((() => {
      this.parentCmp.wHeight = window.innerHeight;
      this.parentCmp.wWidth = window.innerWidth;
      this.parentCmp.CallUpdateCalendarByHub(this.parentCmp.currentHub);
      this.store.dispatch(new LegacyAvailabilityActions.ResizeAvailability([window.innerWidth, window.innerHeight]));
    }).bind(this), 1000);
  }
}