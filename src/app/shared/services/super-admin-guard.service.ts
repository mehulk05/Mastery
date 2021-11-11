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
import { LocalStorageService } from './local-storage.service';
  
  @Injectable()
  export class SuperAdminAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private userAuthService:UserAuthService, private router: Router,
      private localStorageService:LocalStorageService
    ) { }
  
    async canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<any> {
  
     // let token = JSON.parse(localStorage.getItem("userData"))
      const token:any = await this.localStorageService.getDataFromIndexedDB("userData")
      if (token && token.role == "Admin") {
        return true
      }
      this.userAuthService.logout()
      this.router.navigateByUrl("/admin/user-auth")
    }
  }