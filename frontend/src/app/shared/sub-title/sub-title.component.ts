import { Component, Input } from '@angular/core';
import { SubTitle } from './SubTitle';
@Component({
  selector: 'app-sub-title',
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.css']
})
export class SubTitleComponent {
  @Input() subTitleComponent: SubTitle;
}
 