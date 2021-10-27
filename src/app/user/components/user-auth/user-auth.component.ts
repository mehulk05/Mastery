import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private authService: AuthService,
    private ngxLoader: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isPorfileset: boolean = false;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

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
    this.isLoading = true;
    this.ngxLoader.show();
    if (this.isLoginMode) {

      this.authService.login(authData)
        .then(d => {
          this.isLoading = false

            console.log(d)
            this.ngxLoader.hide();
            this.router.navigate([""]);
        })
        .catch(e => {
          this.isLoading = false
          this.error = e.message
          this.ngxLoader.hide();
        })

    } else {
      this.authService.registerUser(authData)
      .then(d => {
        this.isLoading = false
        this.authService.logout()
        this.ngxLoader.hide();
      })
        .catch(e => {
          this.authService.logout()
          this.isLoading = false
          this.error = e
          this.ngxLoader.hide();
        })
    }
    form.reset();
  }
}
