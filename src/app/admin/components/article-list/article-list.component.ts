import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList = []

  constructor(private articleCrudService: ArticleCrudService,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getArticleList()
  }

  async getArticleList() {
    this.apiService.startLoader()
    const result = await this.apiService.get("articles.json")
    this.articleList = this.formatData(result)
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

  editArticle(article) {
    this.router.navigateByUrl("/admin/edit-article/" + article.key)
  }

  async deleteArticle(article) {
    this.apiService.startLoader()
    const result = await this.apiService.delete(`articles/${article.key}.json`)
    this.getArticleList()
  }

  addArticle(){
    this.router.navigateByUrl("/admin/add-article")
  }
}
