import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
    console.log('guard called, isAuth is ', authService.isAuth);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.isAuth; // Always logged
    // const isAuth = true; // Always logged
    const ROLE = this.authService.role;
    console.log('GUARD, isAuth: ', isAuth);
    console.log('STATE, : ', state);

    // if (state.url === '/admin' && ROLE !== 0) {
    //   console.log('not enough permission!');
    //   this.router.navigateByUrl('errorRole');
    // }

    if (isAuth) {
      return true;
    } else {
      this.router.navigateByUrl('error404');
    }

    // // this will be passed from the route config
    // // on the data property
    // const expectedRole = route.data.expectedRole;
    // const token = localStorage.getItem('token');
    // // decode the token to get its payload
    // const tokenPayload = decode(token);
    // if (
    //   !this.auth.isAuthenticated() || 
    //   tokenPayload.role !== expectedRole
    // ) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
  }
}