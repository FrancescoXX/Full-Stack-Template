import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Hub } from '../model/Hub';

@Injectable({ providedIn: 'root' })
export class HubReducerService {

  private initialHub: Hub = {
    hub: 'test',
    title: 'test2',
    url: 'test3',
  };

  private hubTracker = new BehaviorSubject<Hub>(this.initialHub);

  getHub = (): Observable<Hub> => this.hubTracker.asObservable();
  setHub = (updatedHub: Hub): void => this.hubTracker.next(updatedHub);
  resetState = (): void => this.hubTracker.next(this.initialHub);
}
