import { Component, OnInit } from '@angular/core';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCrudService } from '@app/admin/services/user-services/user-crud.service';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  userForm: FormGroup;
  user_id: any;
  userData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crudService:CrudService,
    private toastService:ToastrService,
    private userCrudService:UserCrudService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.user_id = data.id
        let key  = this.user_id.replace(/\./g, ',');
        this.getUser(this.user_id)
      }

    })
    this.createUserForm()
  }

  createUserForm() {
    this.userForm = this.fb.group({
      
      email: ["", Validators.required],
      password: ["", Validators.required],
      date: [new Date()],
      role: ["user"],
    });
  }

  
  createUser(userData){
    this.userCrudService.startLoader()
    this.userCrudService.create(userData,"users").then(data=>{
      this.router.navigateByUrl("/admin/user-list")
    },e=>{
      this.userCrudService.stopLoader()
      this.toastService.error("Error Creating User", "Error")
    })
  }

  getUser(key){
    this.userCrudService.startLoader()
    this.userCrudService.getSingle(key,"users").then(data=>{
      this.userData =  data.data()
      // this.userData.id =  "12"
      this.setUserFormValues(this.userData)
      this.userCrudService.stopLoader()
    },e=>{
      this.toastService.error("Error Fetching Users", "Error")
      this.userCrudService.stopLoader()
    })
  }

  updateUser(userData){
    this.userCrudService.startLoader()
    this.userCrudService.delete(this.user_id,"users").then(data=>{
      this.userCrudService.create(userData, "users").then(data => {
        this.router.navigateByUrl("/admin/user-list")
      }, e => {
        this.userCrudService.stopLoader()
        this.toastService.error("Error Updating User", "Error")
      })
    })
   
  }

  setUserFormValues(userData) {
    this.userForm.patchValue({
      email:userData?.email,
      password:userData?.password,
      date:userData?.date,
      role:userData?.role
    })
  }


  submitForm() {
    let userData = {
      email : this.userForm.value.email,
      password: this.userForm.value.password,
      date: this.userForm.value.date,
      role: this.userForm.value.role,
    }

    if (this.user_id) {
      this.updateUser(userData)
    }
    else {
      this.createUser(userData)
    }
  }

  
  get f() {
    return this.userForm.controls;
  }

  goBack() {
    this.router.navigateByUrl("/admin/user-list")
  }


  // Fire base real Time
  // async createUser(userData) {
  //   let key  = userData.email.replace(/\./g, ',');
  //   this.apiService.startLoader()
  //   await this.apiService.put(`users/${key}.json`, userData).then(result => {
  //     this.router.navigateByUrl("/admin/user-list")
  //   })
  // }

  // async updateUser(userData) {
  //   let newkey  = userData.email.replace(/\./g, ',');
  //   let oldkey = this.user_id.replace(/\./g, ',');
  //   this.apiService.startLoader()
  //   const result  = await this.apiService.delete(`users/${oldkey}.json`)
  //   this.apiService.put(`users/${newkey}.json`, userData).then(data => {
  //     this.router.navigateByUrl("/admin/user-list")
  //   })
  // }

  // getUser(user_id) {
  //   this.apiService.startLoader()
  //   this.apiService.get(`users/${user_id}.json`).then(userData => {
  //     this.setUserFormValues(userData)
  //   })
  // }

}
