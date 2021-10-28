import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '@app/shared/services/user-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  isMenuOpen:boolean =false
  constructor(private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService.user.subscribe(data=>{
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

}

