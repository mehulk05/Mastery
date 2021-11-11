import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { AuthService } from '@app/shared/services/auth.service';
import { EncrDecrService } from '@app/shared/services/EncrDecrService.service';
import { LocalStorageService } from '@app/shared/services/local-storage.service';
import { UserAuthService } from '@app/shared/services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  secretkey: any = environment.secretkey;
  constructor(private apiService: ApiService,
    private userAuth:UserAuthService,
    private router:Router,
    private authService:AuthService,
    private toastService:ToastrService,
    private encryptService:EncrDecrService,
    private localStorageService:LocalStorageService) { }

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
    
    this.userAuth.login(email,password).then(async (userData:any) => {
      userData = userData.data()

      if(!userData){
        this.apiService.stopLoader()
        this.toastService.error("Error While Login", "Error")
        this.router.navigateByUrl("/admin/user-auth")
          
      }
      else{
        if(this.encryptService.get(this.secretkey,userData.password)=== password ){
          this.userAuth.user.next(userData)
          this.userAuth.isAuthenticated = true
          var today = new Date();
          today.setHours(today.getHours() + 1);
          var seconds = today.getTime()
          userData.seconds = seconds
          this.authService.user.next(userData)
          await this.localStorageService.setDataInIndexedDB("userData",userData)
         // localStorage.setItem("userData",JSON.stringify(userData))
          this.router.navigateByUrl("/admin/article-list")
          
        }
        else{
          this.apiService.stopLoader()
          this.toastService.error("Email or Passowrd is incorrect", "Error")
          this.router.navigateByUrl("/admin/user-auth")
        }
      }
      },e=>{
        console.log(e)
      })
    
    form.reset();
  }
}

