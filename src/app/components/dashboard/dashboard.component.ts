import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor( private cookies:CookieService,private router:Router) { 
    
  }
  
 
  ngOnInit(): void {
    if(!this.cookies.check('auth_token')){
    this.router.navigateByUrl("/inicio")  
    }
  }
}


