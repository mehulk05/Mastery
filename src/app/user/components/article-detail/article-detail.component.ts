import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleData: any
  article_id = null;
  url = encodeURIComponent(window.location.href)
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.url)
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.article_id = data.id
        this.getArticle(this.article_id)
      }
    })
  }

  getArticle(article_id) {
    this.apiService.startLoader()
    this.apiService.get(`articles/${article_id}.json`).then((articleData: any) => {
      this.articleData = articleData
      console.log(articleData)
      let body = articleData.body.split("<p>&nbsp;</p>").join("")
      // let body  =  articleData.body.replace(/&nbsp;/g, '');
      // body =  body.replaceAll(/<p>​<\/p>/gi,'8');
      console.log(body)
      this.articleData.body = body
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
        .then(() => console.log("Shared!"))
        .catch(err => console.error(err));
    }
  }
  goBack() {
    console.log("here")
    this.router.navigateByUrl("/user/article-list")
  }

}
