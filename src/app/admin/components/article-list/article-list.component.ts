import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList = []

  constructor(private articleCrudService:ArticleCrudService,
              private router : Router) { }

  ngOnInit(): void {
    this.getArticleList()
  }

  getArticleList(){
    this.articleCrudService.getAllArticle().subscribe(data=>{
      this.articleList = this.formatData(data)
      console.log(this.articleList)
    })
  }

  formatData(data){
    let returnData = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        returnData.push({ ...data[key],key });
      }
    }
    return returnData
  }

  editArticle(article){
    console.log("here")
    this.router.navigateByUrl("/admin/edit-article/"+article.key)
  }

  deleteArticle(article){
    this.articleCrudService.deleteArticleByKey(article.key)
  }
}
