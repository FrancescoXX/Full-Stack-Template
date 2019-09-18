import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  // private isLog: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // console.log('in header component: AUTH IS', this.authService.isAuth);
    // this.isLog = this.authService.isAuth;
  }

  toggleDropdown = () => {
    document.getElementById('myDropdown').classList.toggle('show');

    window.onclick = function (event: any) {
      if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  }

  OnLogin = () => {
    this.router.navigateByUrl('collgslogin');
  }

  OnLogout = () => {
    this.authService.logout();
  }
}
