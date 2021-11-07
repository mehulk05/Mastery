import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { UserAuthService } from '@app/shared/services/user-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  isMenuOpen:boolean =false

  isUser = JSON.parse(localStorage.getItem("userData"))?.role == "user"

  isAdmin = JSON.parse(localStorage.getItem("userData"))?.role != "user"
  
  constructor(
    private router: Router,
    private authService:AuthService,private userAuthService:UserAuthService) {
      this.isUser = JSON.parse(localStorage.getItem("userData"))?.role == "user"

      this.isAdmin = JSON.parse(localStorage.getItem("userData"))?.role != "user"
     }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      console.log(user)
      this.isAuthenticated = !!user;
      console.log(this.isAdmin)
    });
  }

  onLogout() {
    this.isUser = JSON.parse(localStorage.getItem("userData"))?.role == "user"
    this.isAdmin = JSON.parse(localStorage.getItem("userData"))?.role != "user"
    if(this.isAdmin){
      this.authService.logout();
    }
    else{
      this.userAuthService.logout()
      //this.authService.logout();
    }
    
  }

  gotoDonate()
  {
    this.router.navigateByUrl("/admin/view-donate")
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  openMenu(){
    this.isMenuOpen =!this.isMenuOpen
  }

}
