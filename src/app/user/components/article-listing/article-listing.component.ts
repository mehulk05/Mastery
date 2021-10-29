import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent implements OnInit {

  articleList = []

  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.loadArticles()
  }

  async loadArticles() {
    this.apiService.startLoader()
    const result = await this.apiService.get("articles.json")
    let articleList = this.formatData(result)
   this.articleList = this.formarArticleBody(articleList)
    console.log(this.articleList)
  }

  formarArticleBody(articles){
    let updatedArticleList = []
    let desc
     articles.forEach(article => {
      desc = this.extractContent(article.body)
      article.shortDesc = desc
      updatedArticleList.push(article)
    });

    return updatedArticleList

    
  }

  extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  formatData(data) {
    let returnData = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        returnData.push({ ...data[key], key });
      }
    }
    return returnData
  }

  editArticle(article){
    this.router.navigateByUrl("/user/article-detail/" + article.key)
  }

}
