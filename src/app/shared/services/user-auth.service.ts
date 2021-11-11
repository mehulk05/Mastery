import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  isAuthenticated:boolean = false
  user = new BehaviorSubject<any>(null);
  tokenExpirationTimer
  constructor(
    private localStorageService:LocalStorageService,
    private router:Router, private authService:AuthService,private firestore: AngularFirestore
  ) { }

  async autoLogin() {
    const userDataOld:any = await  this.localStorageService.getDataFromIndexedDB("userData")
    //let userDataOld = JSON.parse(localStorage.getItem('userData'));
    if (!userDataOld) {
      return;
    }
    const userData:any = await this.login(userDataOld.email, userDataOld.password)

    if (userData.email && userData.password) {
      this.user.next(userData)
      this.authService.user.next(userData)
      this.isAuthenticated = true
      const expirationDuration =
      userDataOld.seconds - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  login(email,password){
     return this.firestore.collection("users").doc(email).ref.get()
  }

  logout() {

    this.user.next(null)
    this.authService.user.next(null)
    this.isAuthenticated= false
    this.router.navigate(['/admin/user-auth']);
    localStorage.clear()
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.localStorageService.clearDataFromIndexedDB()
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
}
}