import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleData: any
  article_id = null;
  url = encodeURIComponent(window.location.href)
  constructor(private activatedRoute: ActivatedRoute,private toastService:ToastrService, private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.article_id = data.id
        this.getArticle(this.article_id)
      }
    })
  }

  // getArticle(article_id) {
  //   this.apiService.startLoader()
  //   this.apiService.get(`articles/${article_id}.json`).then((articleData: any) => {
  //     this.articleData = articleData
  //     let body = articleData.body.split("<p>&nbsp;</p>").join("")
  //     this.articleData.body = body
  //   })
  // }

  getArticle(article_id) {
    this.crudService.startLoader()
    this.crudService.getSingle(article_id,"article").then(data=>{
      this.articleData =  data.data()
      this.articleData.id =  data.id
      this.crudService.stopLoader()
    },e=>{
      this.toastService.error("Error Fetching Article", "Error")
      this.crudService.stopLoader()
    })
  }
  shareLink() {
    let title = this.articleData.title
    let text = this.articleData.title
    let url = this.url
    if (navigator.share !== undefined) {
      navigator
        .share({
          title,
          text,
          url
        })
        .then(() => console.log(""))
        .catch(err => console.error(err));
    }
  }
  goBack() {
    this.router.navigateByUrl("/user/article-list")
  }

}
