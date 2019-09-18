import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserSignIn } from './UserSignIn';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  error: string;
  isLoading = false;
  isInvalid = false;

  @Input() username: string;
  @Input() password: string;

  constructor(private authService: AuthService, private router: Router) { }

  onAdminLogin(form: NgForm) {
    this.username = form.value.username;
    this.password = form.value.password;

    this.isLoading = true;
    this.isInvalid = false;

    const USERSIGNIN = new UserSignIn(1, this.username, this.password);
    this.authService.login(USERSIGNIN).subscribe(
      dataToken => {
        console.log('TOKEN: ', dataToken.token);
        this.isLoading = false; 
      },
      err => {
        console.log('err:', err);
        this.error = err.error;
        this.isLoading = false;
        this.isInvalid = true;
        form.reset();
      }
    );
  }
}
