import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { LocalStorageService } from '@app/shared/services/local-storage.service';
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
  isMenuOpen: boolean = false

  isUser
  uuid
  isAdmin
  userData

  constructor(
    private router: Router,
    private authService: AuthService, private userAuthService: UserAuthService,
    private localStorgaeService: LocalStorageService) {

  }

  async ngOnInit(): Promise<void> {
    this.authService.autoLogin();
    this.userData = await this.localStorgaeService.getDataFromIndexedDB("userData")
    if (this.userData) {
      this.isUser = this.userData.role == "user"
      this.isAdmin = this.userData.role !== "user"

    }

    this.userSub = this.authService.user.subscribe(user => {
      if (user && user.role == "user") {
        this.isAdmin = false
      }
      else {
        this.isAdmin = user?.role == "Admin"
      }

      this.isAuthenticated = !!user;
    });
  }

  async onLogout() {
    if (this.isAdmin) {
      this.authService.logout();
    }
    else {
      this.userAuthService.logout()
      //this.authService.logout();
    }

  }

  gotoDonate() {
    this.router.navigateByUrl("/admin/view-donate")
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

}
