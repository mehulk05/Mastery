import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { AuthService } from '@app/shared/services/auth.service';
import { UserAuthService } from '@app/shared/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  constructor(private apiService: ApiService,
    private userAuth:UserAuthService,
    private router:Router,
    private authService:AuthService,
    private toastService:ToastrService) { }

  ngOnInit(): void {
    
  }

  isLoading = false;
  error: string = null;
  


  onSubmit(form: NgForm) {
    this.authService.logout()
    this.apiService.startLoader()
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.userAuth.login(email,password).then((userData:any) => {
      userData = userData.data()
      if(!userData){
        this.toastService.error("Error While Login", "Error")
      }
      else{
        if(userData.password === password ){
          this.userAuth.user.next(userData)
          this.userAuth.isAuthenticated = true
          var today = new Date();
          today.setHours(today.getHours() + 1);
          var seconds = today.getTime()
          userData.seconds = seconds
          this.authService.user.next(userData)
          localStorage.setItem("userData",JSON.stringify(userData))
          this.router.navigateByUrl("/admin/article-list")
          
        }
        else{
          this.toastService.error("Email or Passowrd is incorrect", "Error")
        }
      }
      })
    
    form.reset();
  }
}

