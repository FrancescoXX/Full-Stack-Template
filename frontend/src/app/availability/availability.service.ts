import { Injectable } from '@angular/core';
import { Hub } from './model/Hub';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LegacyAvailabilityService {

  private initialHub: Hub = {
    hub: 'test',
    title: 'test2',
    url: 'test3',
  };

  private hubTracker = new BehaviorSubject<Hub>(this.initialHub);

  /** Allows subscription to the behavior subject as an observable */
  getHub = (): Observable<Hub> => this.hubTracker.asObservable();

  /**
   * Allows updating the current value of the behavior subject
   * @param updatedHub new Hub
   */
  setHub(updatedHub: Hub): void {
    this.hubTracker.next(updatedHub);
  }

  /** Resets the count to the initial value */
  resetState(): void {
    this.hubTracker.next(this.initialHub);
  }
}