import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignup } from './UserSignup';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
}) 
export class AdminComponent {

  private featureSelected = 0;

  private isAlert = false;
  private currentRole = 'Admin';

  constructor(private authService: AuthService, private adminService: AdminService, private router: Router) { }

  OnSelectFeature(feature: number){
    this.featureSelected = feature;
  }

  OnCreateCollGS(form: NgForm) {
    console.log('FORM:', form.value);

    // Prepare new user creation request with correct Model
    const username = form.value.username;
    const password = form.value.password; // use bcrypto to encript password on database
    const collGS = form.value.collGS;

    const userSignup = new UserSignup(username, password, 1);
    console.log('CREATE NEW collGS ..: ', userSignup);

    // Validation...

    // Create a new collGS user
    this.adminService.createCollGS(userSignup)
      .subscribe((data: any) => {
        console.log('ok will create new collGs with data: ..', data);
      });
  }

  onClick() {
    //create a collGS
    console.log('onClick');
    this.isAlert = !this.isAlert;
  }

  // UI HOOKS
  OnLogout() {
    console.log('will logout...');
    this.authService.token = null;
    this.authService.isAuth = false;
    this.router.navigateByUrl('page1');
  }

  TestWithToken(){
    console.log('test with token...');
    this.authService.getBookWithToken()
      .subscribe((data: any) => {
        console.log('ok : ..', data);
      });
  }

  OnGetAllCollGS = () => {
    this.authService.getAllCollGS()
    .subscribe((data: any) => {
      console.log('getAllCollGS : ..', data);
    });
  }
}