import { Component, Input } from '@angular/core';
import { TitleValue } from './TitleValue';

@Component({
  selector: 'app-row-title-value',
  templateUrl: './row-title-value.component.html',
  styleUrls: ['./row-title-value.component.css']
})
export class RowTitleValueComponent {
  @Input() titleValue: TitleValue;
}