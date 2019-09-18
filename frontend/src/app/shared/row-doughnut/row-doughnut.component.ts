import { Component, Input } from '@angular/core';
import { Dougnut } from './Doughnut';

@Component({
  selector: 'app-row-doughnut',
  templateUrl: './row-doughnut.component.html',
  styleUrls: ['./row-doughnut.component.css']
})
export class RowDoughnutComponent {
  // Used in html template
  @Input() rowDoughnutComponent: Dougnut;
}