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
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router,private localStorageService:LocalStorageService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<any>{
    
        const token:any = await this.localStorageService.getDataFromIndexedDB("userData")
        if (token) {
          return true
        }
        this.router.navigate(["user/user-auth"], {
            queryParams: { returnUrl: state.url }
        });
    }
    // if (this.authService.user) {
    //     return true;
    //   } else {
    //     this.router.navigate(["admin/auth"], {
    //         queryParams: { returnUrl: state.url }
    //       });
    //   }
    // }
}