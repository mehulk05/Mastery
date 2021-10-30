import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';
import { ApiService } from '@app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList = []

  constructor(private articleCrudService: ArticleCrudService,
    private router: Router,
    private apiService: ApiService,
    private toastrService:ToastrService) { }

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

  ViewArticle(article){
    this.router.navigateByUrl("/admin/view-article/" + article.key)
  }

  onCheckBoxChange(e,article){
    // this.toastrService.success("tite","hello")
    var flag = e.target.checked;
    console.log(flag,article)
   
    article.isPublic =  flag
    this.apiService.startLoader()
    this.apiService.put(`articles/${article.key}.json`, article).then(data => {
      console.log(data)
      var alertMessage = "";
      if(flag)
        alertMessage = "Article visibility changed to public uccessfully";
      else
        alertMessage = "Article visibility changed to private successfully";
      this.toastrService.clear();  
      this.toastrService.success(alertMessage,"Success");  
    },
    error => {
      this.toastrService.error("Error Updating Article  visibility", error);
    });
  }
}
