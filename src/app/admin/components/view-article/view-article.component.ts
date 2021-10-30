import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
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
      let body = articleData.body.split("<p>&nbsp;</p>").join("")
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
    this.router.navigateByUrl("/admin/article-list")
  }

}

