import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from '@app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  constructor(private authService: AuthService,
    private ngxLoader: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.logout()
  }


  isLoading = false;
  error: string = null;
  isPorfileset: boolean = false;

  // onSwitchMode() {
  //   this.isLoginMode = !this.isLoginMode;
  // }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let  authData = {
      email: form.value.email,
      password: form.value.password
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    this.ngxLoader.show();
    
      authObs = this.authService.login(email, password);
    // } else {
    //   authObs = this.authService.signup(email, password);
    // }


    authObs.subscribe(
      resData => {
         this.isLoading = false
            this.ngxLoader.hide();
            this.router.navigate(["admin/article-list"]);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this.ngxLoader.hide();
      }
    );
    form.reset();
  }
}
