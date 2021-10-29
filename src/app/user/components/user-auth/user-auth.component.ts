import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { UserAuthService } from '@app/shared/services/user-auth.service';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private apiService: ApiService,
    private userAuth:UserAuthService,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  isLoading = false;
  error: string = null;
  isPorfileset: boolean = false;


  onSubmit(form: NgForm) {
    this.apiService.startLoader()
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.userAuth.login(email,password).then((userData:any) => {
      console.log(userData)

      if(!userData){
        console.log("wrong")
      }
      else{
        if(userData.password === password ){
          this.userAuth.user.next(userData)
          this.userAuth.isAuthenticated = true
          var today = new Date();
          today.setHours(today.getHours() + 1);
          var seconds = today.getTime()
          userData.seconds = seconds
          localStorage.setItem("userSideData",JSON.stringify(userData))
          console.log("true password")
          this.router.navigateByUrl("/user/article-list")
          
        }
        else{
          console.log("wrong pass")
        }
      }
      })
    
    form.reset();
  }
}

