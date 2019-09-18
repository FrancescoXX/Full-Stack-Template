import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Collgs } from './collgs.model';

@Component({
  selector: 'app-coll-gs-card',
  templateUrl: './coll-gs-card.component.html',
  styleUrls: ['./coll-gs-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollGSCardComponent {
  @Input() collgs: Collgs;
}
