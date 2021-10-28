import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  UserList = []

  constructor(
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllUserList()
  }

  async getAllUserList() {
    this.apiService.startLoader()
    const result = await this.apiService.get("users.json")
    console.log(result)
    this.UserList = this.formatData(result)
    console.log(this.UserList)
  }
  
  formatData(data) {
    let returnData = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        returnData.push({ ...data[key], key });
      }
    }
    return returnData
  }

  // formatData(data) {
  //   let returnData = []
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       let key2 = data[key]
  //       let values = key2[Object.keys(key2)[0]]
  //       returnData.push({ ...values, key ,key2});
  //     }
  //   }
  //   return returnData
  // }

  editUser(user) {
    this.router.navigateByUrl("/admin/edit-user/" + user.email)
  }

  async deleteUser(userData) {
    this.apiService.startLoader()
    let key  = userData.email.replace(/\./g, ',');
    const result = await this.apiService.delete(`users/${key}.json`)
    this.getAllUserList()
  }

  addUser(){
    this.router.navigateByUrl("/admin/add-user")
  }
}

