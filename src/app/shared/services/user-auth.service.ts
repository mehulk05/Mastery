import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private router:Router, private apiService:ApiService,private firestore: AngularFirestore
  ) { }

  async autoLogin() {
    
    let userDataOld = JSON.parse(localStorage.getItem('userSideData'));
    if (!userDataOld) {
      return;
    }
    const userData:any = await this.login(userDataOld.email, userDataOld.password)
    if (userData.email && userData.password) {
      this.user.next(userData)
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
    this.isAuthenticated= false
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