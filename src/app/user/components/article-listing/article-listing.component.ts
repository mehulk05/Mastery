import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent implements OnInit {
  searchText
  articleList = []
  config: any;
  constructor(private crudService:CrudService, private router:Router) { 
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.articleList.length
    };
  }

  ngOnInit(): void {
    this.loadArticles()
  }

  // async loadArticles() {
  //   this.apiService.startLoader()
  //   const result = await this.apiService.get("articles.json")
  //   let articleList = this.formatData(result)
  //  this.articleList = await this.formarArticleBody(articleList)
  // }

  async loadArticles() {
    this.crudService.startLoader()
    this.crudService.getAll("article").subscribe(data => {
      this.articleList = data.map(e => {
        let desc
        desc = this.extractContent(e.payload.doc.data()['body'])
        let imgUrl =  e.payload.doc.data()['imgUrl'] ? e.payload.doc.data()['imgUrl'] : 'https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg'
        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          body: e.payload.doc.data()['body'],
          category: e.payload.doc.data()['category'],
          date: e.payload.doc.data()['date'],
          shortDesc:desc,
          imgUrl : imgUrl,
          author : e.payload.doc.data()['author'],
          isPublic:e.payload.doc.data()["isPublic"]
        };
      })
      this.crudService.stopLoader()
    },e=>{
      this.crudService.stopLoader()
    });
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

  pageChanged(event){
    this.config.currentPage = event;
  }
}
