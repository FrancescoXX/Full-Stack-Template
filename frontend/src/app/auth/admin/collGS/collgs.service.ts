import { Injectable } from '@angular/core';
import { Collgs } from './coll-gs-card/collgs.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CollgsService {

  public BASE_URL = 'http://192.168.10.78:2000';
  usersUrl = `users`;
  constructor(private http: HttpClient) { }

  getAll = () => {
    return this.http.get<Collgs[]>(`${this.BASE_URL}/${this.usersUrl}`);
  }
}
