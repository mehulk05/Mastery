import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.css']
})
export class BookListingComponent implements OnInit {

  
  searchText
  bookList = []

  constructor(private apiService: ApiService,
    private crudService: CrudService, 
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  async loadBooks() {
    this.apiService.startLoader()
    this.crudService.startLoader()
    this.crudService.getAll("books").subscribe(data => {
      this.crudService.stopLoader()
      this.bookList = data.map(e => {
        let url =  e.payload.doc.data()['url']
        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          url: url,
          author: e.payload.doc.data()['author'],
          date: e.payload.doc.data()['date'],
          thumbnail: e.payload.doc.data()['thumbnail'],
          description:e.payload.doc.data()['description']
        };
      })
      console.log(this.bookList)
    }, e => {
      this.crudService.stopLoader()
      this.toastrService.error("Error Fetching Book", "Error")
    });
  }

  formatDate(date){
    let formatedDate = date.toDate()
    return formatedDate
  }

  viewBook(book){
    window.open(book.url, '_blank')
  }
}
