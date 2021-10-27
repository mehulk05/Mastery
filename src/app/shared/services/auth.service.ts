import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@app/user/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  userData = new BehaviorSubject(null)
  private isAuthenticated = false;

  constructor(private angularFireAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private ngxLoader: NgxSpinnerService,) {
  }

  initAuthListener() {
    this.ngxLoader.show()
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData.next(user)
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.ngxLoader.hide()
        this.router.navigate(['/admin/add-article']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
        this.ngxLoader.hide()
      }
    });
  }

  registerUser(authData: AuthData) {
   
   return this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.success(result)
        this.logout()
      })
      .catch(e => {
        this.error(e)
      });
  }

  login(authData: AuthData) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        result.user.getIdToken().then(token=>{
          localStorage.setItem("token",token)
        })
        this.userData.next(result)
        localStorage.setItem('userData', JSON.stringify(result));
        console.log(result)
      })
      .catch(e => {
        this.error(e)
      });
  }

  logout() {
    this.angularFireAuth.signOut();
    localStorage.clear()
  }

  isAuth() {
    return this.isAuthenticated;
  }

  error(message) {
    this.ngxLoader.hide();
    Swal.fire({
      title: message.code,
      text: message.message,
      icon: 'error',
      timer: 5000,
      confirmButtonText: "OKAY"
    });
  }

  success(message){
    Swal.fire({
      title:"Success",
      text: "User Created Successfully",
      icon: 'success',
      timer: 5000,
      confirmButtonText: "OKAY"
    });
  }
}

export interface AuthData {
  email: string;
  password: string;
}