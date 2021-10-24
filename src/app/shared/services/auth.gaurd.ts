import { APP_ID, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  CanActivateChild, CanDeactivate, CanLoad, Router, RouterStateSnapshot,
} from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '@app/common/constants/constant';

// Constants
import { URLConstants } from '../../common/constants/routerLink-constants';

// Service
import { LocalStorageService } from './local-storage.service';

/****************************************************************************
@PURPOSE      : Dont allow public pages to get accessed. (After Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
@Injectable()
export class CanLoginActivate implements CanActivate {
  URLConstants = URLConstants;
  constructor(public localStorageService: LocalStorageService, public router: Router) { }
  async canActivate() {
    const token: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    if (!token) {
      return true;
    }
    this.router.navigate([this.URLConstants.HOMEPAGE]);
    return false;
  }
}
/****************************************************************************/

/****************************************************************************
@PURPOSE      : Dont allow authorized pages to get accessed.  (Before Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class CanAuthActivate implements CanActivate {
  URLConstants = URLConstants;
  constructor(public localStorageService: LocalStorageService, public router: Router) { }
  async canActivate() {
    const token: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    if (token) {
      return true;
    }
    this.router.navigate([this.URLConstants.HOMEPAGE]);
    return false;
  }
}
/****************************************************************************/

/****************************************************************************
@PURPOSE      : Dont allow to go to dashbaord if not purchased subscription.  (After & Before Login)
@PARAMETERS   : N/A
@RETURN       : <boolean>
/****************************************************************************/
// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class CanSubscriptionAuthActivate implements CanActivate {
  URLConstants = URLConstants;
  constructor(public localStorageService: LocalStorageService, public router: Router) { }
  async canActivate() {
    const isSubscriptionPurchased: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.SUBSCRIPTION_PURCHASED);
    const token: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);
    if (token) {
      if (isSubscriptionPurchased) {
        return true;
      } else {
        this.router.navigate([this.URLConstants.SUBSCRIPTION_PAGE]);
      }
    } else {
      this.router.navigate([this.URLConstants.HOMEPAGE]);
      return false;
    }
  }
}
/****************************************************************************/
