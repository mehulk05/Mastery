import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  bookForm: FormGroup;
  book_id: any;
  firestoreKey = "books"
  bookData: any;
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.book_id = data.id
        this.getBook(this.book_id)
      }

    })
    this.createBookForm()
  }

  createBookForm() {
    this.bookForm = this.fb.group({

      title: ["", Validators.required],
      description:[""],
      url: ["", Validators.required],
      thumbnail: [""],
      date: [new Date()],
      author: ["user"],
    });
  }

  getBook(book_id) {
    this.isLoading = true
    this.crudService.startLoader()
    // this.apiService.get(`videos/${user_id}.json`).then(userData => {
    //   this.setUserFormValues(userData)
    // })
    this.crudService.getSingle(book_id, this.firestoreKey).then(data => {
      console.log(data.data())
      this.crudService.stopLoader()
      this.bookData = data.data()
      this.bookData.key = data.id
      this.isLoading = false
      this.setBookFormValues(this.bookData)
    }, e => {
      this.crudService.stopLoader()
      this.isLoading = false
      this.toastService.error("Error Fetching Book", "Error")
    })
  }

  setBookFormValues(bookData) {
    this.bookForm.patchValue({
      title: bookData?.title,
      description:bookData?.description,
      url: bookData?.url,
      thumbnail: bookData?.thumbnail,
      date: bookData?.date,
      author: bookData.author
    })
  }

 
  submitForm() {
    let bookObject = {
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      date: this.bookForm.value.date,
      url: this.bookForm.value.url,
      thumbnail: this.bookForm.value.thumbnail,
      description:this.bookForm.value.description
    }

    if (this.book_id) {
      this.updateBook(bookObject)
    }
    else {
      this.createBook(bookObject)
    }
  }

  async createBook(bookObject) {
    this.crudService.startLoader();
    this.crudService.create(bookObject, this.firestoreKey).then(result => {
      this.router.navigateByUrl("/admin/book-list")
    }, e => {
      this.crudService.stopLoader()
      this.toastService.error("Error Creating Book", "Error")
    })

  }


  updateBook(bookObject) {
    this.crudService.startLoader()
    // this.apiService.put(`videos/${this.video_id}.json`, videoObject).then(data => {
    //   this.router.navigateByUrl("/admin/video-list")
    // })

    this.crudService.update(bookObject, this.firestoreKey, this.book_id).then(data => {
      this.router.navigateByUrl("/admin/book-list")
    }, e => {
      console.log(e)
      this.crudService.stopLoader()
      this.toastService.error("Error Creating Book", "Error")
    })
  }

  get f() {
    return this.bookForm.controls;
  }

  goBack() {
    this.router.navigateByUrl("/admin/book-list")
  }
}

