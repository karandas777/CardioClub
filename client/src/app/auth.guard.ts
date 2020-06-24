import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router:Router, private noti:NotificationsService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      var type = localStorage.getItem('userType');
      if(type === "admin"){
        return true;
      }
      else{
        this.noti.error('Only Admin','Can Access this section');
        // this.router.navigateByUrl('/home/dashboard');
        return false;
      }
    }
  
}
