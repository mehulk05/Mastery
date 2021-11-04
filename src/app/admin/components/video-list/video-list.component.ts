import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videoList = []

  constructor(
    private router: Router,
    private crudService: CrudService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getVideos()
  }

  async getVideos() {
    this.crudService.startLoader()
    this.crudService.getAll("videos").subscribe(data => {
      this.crudService.stopLoader()
      this.videoList = data.map(e => {
        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          url: e.payload.doc.data()['url'],
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

  formatData(data) {
    let returnData = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        returnData.push({ ...data[key], key });
      }
    }
    return returnData
  }

  formatDate(date) {
    let formatedDate = date.toDate()
    return formatedDate
  }
  editVideo(video) {
    this.router.navigateByUrl("/admin/edit-video/" + video.key)
  }

  async deleteVideo(video) {
    this.crudService.startLoader()
    this.crudService.delete(video.key, "videos").then(data => {
      this.crudService.stopLoader()
      this.getVideos();
    }, e => {
      this.crudService.stopLoader()
      this.toastrService.error("Error Fetching Video", "Error")
    })
  }

  addVideo() {
    this.router.navigateByUrl("/admin/add-video")
  }

  viewVideo(video) {
    window.open(video.url, '_blank')
  }
}
