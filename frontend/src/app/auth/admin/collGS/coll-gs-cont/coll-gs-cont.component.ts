import { Component, OnInit } from '@angular/core';
import { CollgsService } from '../collgs.service';
import { Collgs } from '../coll-gs-card/collgs.model';
import { CollgsStoreService } from '../collgs-store.service';

@Component({
  selector: 'app-coll-gs-cont',
  templateUrl: './coll-gs-cont.component.html',
  styleUrls: ['./coll-gs-cont.component.css']
})
export class CollGSContComponent {
  constructor(private collGSStoreService: CollgsStoreService) { }
}
