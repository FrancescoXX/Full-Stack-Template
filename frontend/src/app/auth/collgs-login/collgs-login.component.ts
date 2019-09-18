import { Component, Input } from '@angular/core';
import { UserSignIn } from '../admin-login/UserSignIn';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-collgs-login',
  templateUrl: './collgs-login.component.html',
  styleUrls: ['./collgs-login.component.css']
})
export class CollgsLoginComponent {

  private isInvalid = false;

  @Input() username: string;
  @Input() password: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  onSignin = (form: NgForm) => {
    const USERNAME = form.value.username;
    const PASSWORD = form.value.password;
    this.authService.checkCollGSUser(USERNAME, PASSWORD)
      .subscribe((data: any) => {
        console.log('data:', data);
        if (PASSWORD === data.password) {
          this.authService.isAuth = true; // set loged status to true
          this.authService.role = 1;
          
          // this.getToken(USERNAME, PASSWORD); //TOKEN DISABLED FOR NOW
          
          this.router.navigateByUrl('page1');
          return true;
        } else {
          // console.log('COLLGS wrong password checked on backend!');
          this.isInvalid = true;
          form.reset();
          return false;
        }
      });
  }

  getToken(username: string, password: string) {
    console.log('getting token..');
    
    const USERSIGNIN = new UserSignIn(1, username, password);
    this.authService.login(USERSIGNIN) //fix only logs for 1 now
      .subscribe((data: any) => {
        console.log('TOKEN: ', data.token);
        this.authService.token = data.token; // Stores the token in auth service to make it globally available
      });
  }
}
