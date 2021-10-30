import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent implements OnInit {
  searchText
  articleList = []

  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
    console.log(this.searchText)
    this.loadArticles()
  }

  async loadArticles() {
    this.apiService.startLoader()
    const result = await this.apiService.get("articles.json")
    let articleList = this.formatData(result)
   this.articleList = await this.formarArticleBody(articleList)
    console.log(this.articleList)
  }

  formarArticleBody(articles){
    let updatedArticleList = []
    let publicArticles = []
    let desc
     articles.forEach(article => {
      desc = this.extractContent(article.body)
      article.shortDesc = desc
      article.imgUrl = article.imgUrl ? article.imgUrl : 'https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg'
      article.isPublic = article.isPublic ? article.isPublic : false
      if(article.isPublic){
        publicArticles.push(article)
      }
     
      updatedArticleList.push(article)
    });

    return publicArticles

    
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
