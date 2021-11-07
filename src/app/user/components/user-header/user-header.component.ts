import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '@app/shared/services/user-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  isMenuOpen:boolean =false
  constructor(private userAuthService:UserAuthService,private router:Router) { }

  ngOnInit(): void {
    this.userSub = this.userAuthService.user.subscribe(data=>{
     this.isAuthenticated = !!data
    })
  }

  onLogout() {
    this.userAuthService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  openMenu(){
    this.isMenuOpen =!this.isMenuOpen
  }
  gotoDonate(){
    this.router.navigateByUrl("/user/donate")
  }
}