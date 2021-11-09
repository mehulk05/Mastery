import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
  } from '@angular/router';
  
  import { Injectable } from '@angular/core';
  
  
  import { Observable } from 'rxjs';
  import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';
  
  @Injectable()
  export class SuperAdminAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private userAuthService:UserAuthService, private router: Router,
    ) { }
  
    canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
      let token = JSON.parse(localStorage.getItem("userData"))

      if (token && token.role == "Admin") {
        return true
      }
      this.userAuthService.logout()
      this.router.navigateByUrl("/admin/user-auth")
    }
  }