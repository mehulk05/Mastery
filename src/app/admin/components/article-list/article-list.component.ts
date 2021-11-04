import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
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
    private toastrService:ToastrService,
    private crudService:CrudService,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    this.getArticleList()
  }

  async getArticleList() {
    this.crudService.startLoader()
    this.crudService.getAll("article").subscribe(data => {
      this.articleList = data.map(e => {
        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          body: e.payload.doc.data()['body'],
          category: e.payload.doc.data()['category'],
          date: e.payload.doc.data()['date'],
          imgUrl : e.payload.doc.data()['imgUrl'],
          author : e.payload.doc.data()['author'],
          isPublic:e.payload.doc.data()["isPublic"]
        };
      })
      this.crudService.stopLoader()
    },e=>{
      this.crudService.stopLoader()
    });
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


  formatDate(date){
    let formatedDate = date.toDate()
    return formatedDate
  }

  addArticle(){
    this.router.navigateByUrl("/admin/add-article")
  }

  ViewArticle(article){
    this.router.navigateByUrl("/admin/view-article/" + article.key)
  }

  onCheckBoxChange(e,article){
    var flag = e.target.checked;
    var alertMessage = "";
    article.isPublic =  flag
    if(flag)
        alertMessage = "Article visibility changed to public uccessfully";
      else
        alertMessage = "Article visibility changed to private successfully";
    this.updateArticle(article, alertMessage)
  }

  updateArticle(articleObject,msg) {
    this.crudService.startLoader()
    this.crudService.update(articleObject,"article",articleObject.key).then(data=>{
      this.toastService.success(msg,"Success")
      this.getArticleList()
      
    },e=>{
      this.toastService.error("Error Updating Article", "Error")
      this.crudService.stopLoader()
    })
  }

  deleteArticle(article){
    this.crudService.startLoader()
      this.crudService.delete(article.key,"article").then(data=>{
      this.crudService.stopLoader()
      this.getArticleList();
    },e=>{
      this.crudService.stopLoader()
      this.toastrService.error("Error Fetching Articles", "Error")
    })
  }
}
