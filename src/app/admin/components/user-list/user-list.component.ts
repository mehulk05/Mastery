import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCrudService } from '@app/admin/services/user-services/user-crud.service';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  UserList = []

  constructor(
    private router: Router,
    private apiService: ApiService, private crudService: CrudService,
    private userCrudService:UserCrudService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllUserList()
  }

  async getAllUserList() {
    this.userCrudService.startLoader()
    this.userCrudService.getAll("users").subscribe(data => {
      this.userCrudService.stopLoader()
      this.UserList = data.map(e => {
        return {
          key: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
          date: e.payload.doc.data()['date'],

        };
      })
    },e=>{
      this.userCrudService.stopLoader()
      this.toastrService.error("Error Fetching Users", "Error")
    });
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
    this.userCrudService.startLoader()
      this.userCrudService.delete(userData.email,"users").then(data=>{
      this.userCrudService.stopLoader()
      this.getAllUserList();
    },e=>{
      this.userCrudService.stopLoader()
      this.toastrService.error("Error Fetching Users", "Error")
    })
  }

  addUser(){
    this.router.navigateByUrl("/admin/add-user")
  }


  // async getAllUserList() {
  //   this.apiService.startLoader()
  //   const result = await this.apiService.get("users.json")
  //   console.log(result)
  //   this.UserList = this.formatData(result)
  //   console.log(this.UserList)
  // }

  // async deleteUser(userData) {
  //   this.apiService.startLoader()
  //   let key  = userData.email.replace(/\./g, ',');
  //   const result = await this.apiService.delete(`users/${key}.json`)
  //   this.getAllUserList()
  // }
}

