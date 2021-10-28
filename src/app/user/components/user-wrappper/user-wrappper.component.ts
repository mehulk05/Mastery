import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '@app/shared/services/user-auth.service';

@Component({
  selector: 'app-user-wrappper',
  templateUrl: './user-wrappper.component.html',
  styleUrls: ['./user-wrappper.component.css']
})
export class UserWrappperComponent implements OnInit {

  constructor(private userService:UserAuthService) { }

  ngOnInit(): void {
    console.log("calling")
    this.userService.autoLogin()
  }

}
