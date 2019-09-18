import { Component, Input , Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.css']
})
export class GenericErrorComponent {
  @Input() errorMessage: string = '<error>';

  constructor(public snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
