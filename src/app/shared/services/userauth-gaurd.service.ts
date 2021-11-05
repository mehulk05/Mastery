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

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let token = JSON.parse(localStorage.getItem("userSideData"))
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