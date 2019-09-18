import { Component, Input } from '@angular/core';
import { Title } from './Title';

/**
 * A presentation component to show a Title in the Application
 */

@Component({
  selector: 'app-row-title',
  templateUrl: './row-title.component.html',
  styleUrls: ['./row-title.component.css']
})
export class RowTitleComponent {
  @Input() rowTitleComponent: Title;
}