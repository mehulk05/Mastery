import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  isAuthenticated:boolean = false
  user = new BehaviorSubject<any>(null);
  tokenExpirationTimer
  constructor(
    private router:Router, private apiService:ApiService
  ) { }

  async autoLogin() {
    this.apiService.startLoader()
    let userDataOld = JSON.parse(localStorage.getItem('userSideData'));
    if (!userDataOld) {
      return;
    }
    const userData:any = await this.login(userDataOld.email, userDataOld.password)
    console.log(userData)
    if (userData.email && userData.password) {
      this.user.next(userData)
      this.isAuthenticated = true
      const expirationDuration =
      userDataOld.seconds - new Date().getTime();
        console.log(expirationDuration)
      this.autoLogout(expirationDuration);
      this.router.navigateByUrl("/user/article-list")
    }
  }

  login(email,password){
    let key = email.replace(/\./g, ',');
     return this.apiService.get(`users/${key}.json`)
  }

  logout() {

    this.user.next(null)
    this.isAuthenticated= false
    console.log("hhere")
    this.router.navigate(['/user/user-auth']);
    localStorage.clear()
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
}
}