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
import { LocalStorageService } from './local-storage.service';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  key = environment.firebase.apiKey
  userdata: User;
  constructor(private angularFireAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private ngxLoader: NgxSpinnerService,) {
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + this.key
        ,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + this.key,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  async autoLogin() {

    // const userData: {
    //   email: string;
    //   id: string;
    //   _token: string;
    //   seconds:string,
    //   _tokenExpirationDate: string;
    // } = JSON.parse(localStorage.getItem('userData'));
    // let userData:any = JSON.parse(localStorage.getItem('userData'));

    // let userData:any
    const userData: any = await this.localStorageService.getDataFromIndexedDB("userData")
    if (userData) {
      this.user.next(userData);
    }

    if (!userData) {
      return;
    }
    if (userData?.seconds) {
      this.user.next(userData);
      const expirationDuration =
        userData.seconds - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  async logout() {
    this.user.next(null);
    this.router.navigate(['/admin/auth']);
    this.localStorageService.clearDataFromIndexedDB()
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  async autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);

  }



  isLoggedIn(): boolean {
    this.user.subscribe(userdata => {
      this.userdata = userdata
    })
    if (this.userdata !== null) {

      return true;
    }
  }

  private async handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    user.role = "Admin"
    user.uuid = userId
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    // localStorage.setItem('userData', JSON.stringify(user));
    await this.localStorageService.setDataInIndexedDB("userData", user)

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
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

  success(message) {
    Swal.fire({
      title: "Success",
      text: message,
      icon: 'success',
      timer: 5000,
      confirmButtonText: "OKAY"
    });
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.logout()
        this.router.navigate(['admin/auth']);
        this.success("Reset Password Mail sent");
      })
  }

}
