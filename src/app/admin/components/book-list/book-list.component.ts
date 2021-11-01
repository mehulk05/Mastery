import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList = []

  constructor(
    private router: Router,
    private crudService: CrudService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getBooks()
  }

  async getBooks() {
    this.crudService.startLoader()
    this.crudService.getAll("books").subscribe(data => {
      this.crudService.stopLoader()
      this.bookList = data.map(e => {
        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          description:e.payload.doc.data()['description'],
          url: e.payload.doc.data()['url'],
          author: e.payload.doc.data()['author'],
          date: e.payload.doc.data()['date'],
          thumbnail: e.payload.doc.data()['thumbnail'],
        };
      })
    },e=>{
      this.crudService.stopLoader()
      this.toastrService.error("Error Fetching Book", "Error")
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

  formatDate(date){
    let formatedDate = date.toDate()
    return formatedDate
  }
  
  editBook(book) {
    this.router.navigateByUrl("/admin/edit-book/" + book.key)
  }

  async deleteBook(book) {
    this.crudService.startLoader()
      this.crudService.delete(book.key,"books").then(data=>{
      this.crudService.stopLoader()
      this.getBooks();
    },e=>{
      this.crudService.stopLoader()
      this.toastrService.error("Error Fetching Book", "Error")
    })
    // const result = await this.apiService.delete(`videos/${video.key}.json`)
  }

  addBook() {
    this.router.navigateByUrl("/admin/add-book")
  }

  viewBook(book) {
    window.open(book.url, '_blank')
  }
}
