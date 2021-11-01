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
      console.log(this.articleList)
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
    // this.toastrService.success("tite","hello")
    var flag = e.target.checked;
    console.log(flag,article)
    var alertMessage = "";
    article.isPublic =  flag
    if(flag)
        alertMessage = "Article visibility changed to public uccessfully";
      else
        alertMessage = "Article visibility changed to private successfully";
    this.updateArticle(article, alertMessage)
    // this.apiService.put(`articles/${article.key}.json`, article).then(data => {
    //   console.log(data)
    //   var alertMessage = "";
    //   if(flag)
    //     alertMessage = "Article visibility changed to public uccessfully";
    //   else
    //     alertMessage = "Article visibility changed to private successfully";
    //   this.toastrService.clear();  
    //   this.toastrService.success(alertMessage,"Success");  
    // },
    // error => {
    //   this.toastrService.error("Error Updating Article  visibility", error);
    // });
  }

  updateArticle(articleObject,msg) {
    this.crudService.startLoader()
    this.crudService.update(articleObject,"article",articleObject.key).then(data=>{
      console.log(data)
      this.getArticleList()
 
    },e=>{
      console.log(e)
      this.toastService.error("Error Updating Article", "Error")
      this.crudService.stopLoader()
    })
  }

  // async getArticleList() {
  //   this.apiService.startLoader()
  //   const result = await this.apiService.get("articles.json")
  //   this.articleList = this.formatData(result)
  // }

  // async deleteArticle(article) {
  //   this.apiService.startLoader()
  //   const result = await this.apiService.delete(`articles/${article.key}.json`)
  //   this.getArticleList();
  // }
}
