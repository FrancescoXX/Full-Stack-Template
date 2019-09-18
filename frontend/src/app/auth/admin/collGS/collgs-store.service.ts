import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CollgsService } from './collgs.service';
import { Collgs } from './coll-gs-card/collgs.model';

@Injectable({ providedIn: 'root' })
export class CollgsStoreService {

  constructor(private collGSService: CollgsService) {
    this.fetchAll();
  }

  private readonly _todos = new BehaviorSubject<Collgs[]>([]);
  readonly todos$ = this._todos.asObservable().pipe(shareReplay(1));

  get todos(): Collgs[] {
    return this._todos.getValue();
  }

  set todos(val: Collgs[]) {
    this._todos.next(val);
  }

  fetchAll = async () => {
    this.todos = await this.collGSService.getAll().toPromise();
  }
}