import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-videos',
  templateUrl: './add-edit-videos.component.html',
  styleUrls: ['./add-edit-videos.component.css']
})
export class AddEditVideosComponent implements OnInit {
  videoForm: FormGroup;
  video_id: any;
  firestoreKey = "videos"
  videoData: any;
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private crudService: CrudService,
    private toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.video_id = data.id
        this.getVideo(this.video_id)
      }

    })
    this.createVideoForm()
  }

  createVideoForm() {
    this.videoForm = this.fb.group({

      title: ["", Validators.required],
      url: ["", Validators.required],
      thumbnail: [""],
      date: [new Date()],
      creator: ["user"],
    });
  }

  getVideo(video_id) {
    this.isLoading = true
    this.crudService.startLoader()
    // this.apiService.get(`videos/${user_id}.json`).then(userData => {
    //   this.setUserFormValues(userData)
    // })
    this.crudService.getSingle(video_id, this.firestoreKey).then(data => {
      this.crudService.stopLoader()
      this.videoData = data.data()
      this.videoData.key = data.id
      this.isLoading = false
      this.setVideoFormValues(this.videoData)
    }, e => {
      this.crudService.stopLoader()
      this.isLoading = false
      this.toastService.error("Error Fetching Video", "Error")
    })
  }

  setVideoFormValues(videoData) {
    this.videoForm.patchValue({
      title: videoData?.title,
      url: videoData?.url,
      thumbnail: videoData?.thumbnail,
      date: videoData?.date,
      creator: videoData.creator
    })
  }
  async onBlurVideoFeild() {
    console.log("here")
    let videoUrl = this.videoForm.value.url

    if (videoUrl) {
      var thumbnail = await this.get_youtube_thumbnail(videoUrl, 'medium');
      console.log(thumbnail)

      this.videoForm.patchValue({
        thumbnail: thumbnail
      })
    }
  }

  get_youtube_thumbnail(url, quality) {
    if (url) {
      var video_id, result;
      if (result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)) {
        video_id = result.pop();
      }
      else if (result = url.match(/youtu.be\/(.{11})/)) {
        video_id = result.pop();
      }

      if (video_id) {
        if (typeof quality == "undefined") {
          quality = 'high';
        }

        var quality_key = 'maxresdefault'; // Max quality
        if (quality == 'low') {
          quality_key = 'sddefault';
        } else if (quality == 'medium') {
          quality_key = 'mqdefault';
        } else if (quality == 'high') {
          quality_key = 'hqdefault';
        }

        var thumb_nail = "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
        return thumb_nail;
      }
    }
    return false;
  }
  submitForm() {
    let videoObject = {
      title: this.videoForm.value.title,
      creator: this.videoForm.value.creator,
      date: this.videoForm.value.date,
      url: this.videoForm.value.url,
      thumbnail: this.videoForm.value.thumbnail
    }

    if (this.video_id) {
      this.updateVideo(videoObject)
    }
    else {
      this.createVideo(videoObject)
    }
  }

  async createVideo(videoObject) {
    this.crudService.startLoader();
    this.crudService.create(videoObject, this.firestoreKey).then(result => {
      this.router.navigateByUrl("/admin/video-list")
    }, e => {
      this.crudService.stopLoader()
      this.toastService.error("Error Creating Video", "Error")
    })

  }


  updateVideo(videoObject) {
    this.crudService.startLoader()
    // this.apiService.put(`videos/${this.video_id}.json`, videoObject).then(data => {
    //   this.router.navigateByUrl("/admin/video-list")
    // })

    this.crudService.update(videoObject, this.firestoreKey, this.video_id).then(data => {
      this.router.navigateByUrl("/admin/video-list")
    }, e => {
      console.log(e)
      this.crudService.stopLoader()
      this.toastService.error("Error Creating Video", "Error")
    })
  }

  get f() {
    return this.videoForm.controls;
  }

  goBack() {
    this.router.navigateByUrl("/admin/video-list")
  }
}
