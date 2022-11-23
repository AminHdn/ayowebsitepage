
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router,){}
  canActivate() {
    if(this.authService.IsLoggedIn()){
      console.log('in');
      return true;
      
    }
    
      this.router.navigate(['home']);
      
      return false;
      
   
  }
  
}
