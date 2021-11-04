import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-listing',
  templateUrl: './video-listing.component.html',
  styleUrls: ['./video-listing.component.css']
})
export class VideoListingComponent implements OnInit {

  searchText
  videoList = []

  constructor(private apiService: ApiService, private router: Router, private crudService: CrudService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loadVideos()
  }

  async loadVideos() {
    this.apiService.startLoader()
    this.crudService.startLoader()
    this.crudService.getAll("videos").subscribe(data => {
      this.crudService.stopLoader()
      this.videoList = data.map(e => {
        let url =  e.payload.doc.data()['url']
        url = url.replace("watch?v=","embed/")
        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          url: url,
          creator: e.payload.doc.data()['creator'],
          date: e.payload.doc.data()['date'],
          thumbnail: e.payload.doc.data()['thumbnail'],
        };
      })
    }, e => {
      this.crudService.stopLoader()
      this.toastrService.error("Error Fetching Video", "Error")
    });
  }

  formatDate(date){
    let formatedDate = date.toDate()
    return formatedDate
  }

  editArticle(video){
    window.open(video.url, '_blank')
  }
}
