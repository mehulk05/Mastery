import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {
  articleForm: FormGroup;
  article_id: null;
  aricleData:any
  config: any;
  author = JSON.parse(localStorage.getItem("userData"))
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleCrudService: ArticleCrudService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private crudService:CrudService,
    private toastService: ToastrService
  ) {
    this.config = { uiColor: '#f2f2f2' };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.article_id = data.id
        this.getArticle(this.article_id)
      }

    })
    this.createArticleForm()
    this.config.extraPlugins = 'colorbutton , justify'
    this.config = {
      extraPlugins: 'uploadimage',
      uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images'
    }
  }

  createArticleForm() {
    this.articleForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      body: ["", Validators.required],
      date: [new Date()],
      author: [this.author.email],
      category:[""],
      isPublic:[false]
    });
  }

  getArticle(article_id) {
    this.crudService.startLoader()
    this.crudService.getSingle(article_id,"article").then(data=>{
      this.aricleData =  data.data()
      this.aricleData.id =  data.id
      this.setArticleFormValues(this.aricleData)
      this.crudService.stopLoader()
    },e=>{
      this.toastService.error("Error Fetching Article", "Error")
      this.crudService.stopLoader()
    })
  }

  setArticleFormValues(articleData) {
    this.articleForm.patchValue({
      title: articleData?.title,
      body: articleData?.body,
      date: articleData?.date,
      author: articleData?.author,
      category:articleData?.category,
      isPublic:articleData.isPublic ? articleData.isPublic :false
    })
  }

  getImages(string) {
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
    const images = [];
      let img;
      while ((img = imgRex.exec(string))) {
         images.push(img[1]);
      }
    return images;
  }  

    getMeta(url){   
    var img = new Image();
    img.src = url
    console.log(img.height,img.width)
    return {ht:img.height,width:img.width,url:url}
    
} 

  submitForm() {
    let body = this.articleForm.value.body
    let img = this.getImages(body)

    let imgUrl ="https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg"

    if(img.length>0){
      img.map(item=>{
        let meta  = this.getMeta(item)
        if(meta.width>300){
          imgUrl = meta.url
        }
      })
    }
    
    let articleObject = {
      title: this.articleForm.value.title,
      body: this.articleForm.value.body,
      author: this.articleForm.value.author,
      category: this.articleForm.value.category,
      date: this.articleForm.value.date,
      isPublic: this.articleForm.value.isPublic,
      imgUrl: imgUrl,
    }

    if (this.article_id) {
      this.updateArticle(articleObject)
    }
    else {
      this.createArticle(articleObject)
    }
  }

  async createArticle(articleObject) {
    this.crudService.startLoader()
    this.crudService.create(articleObject,"article").then(data=>{
      this.router.navigateByUrl("/admin/article-list")
    },e=>{
      console.log(e)
      this.crudService.stopLoader()
      this.toastService.error("Error Creating Article", "Error")
    })
  }

  updateArticle(articleObject) {
    this.crudService.startLoader()
    this.crudService.update(articleObject,"article",this.article_id).then(data=>{
      console.log(data)
      this.router.navigateByUrl("/admin/article-list")
 
    },e=>{
      console.log(e)
      this.toastService.error("Error Updating Article", "Error")
      this.crudService.stopLoader()
    })
  }

  get f() {
    return this.articleForm.controls;
  }

  goBack() {
    this.router.navigateByUrl("/admin/article-list")
  }

  // Firebase Realtime operation
  // getArticle(article_id) {
  //   this.apiService.startLoader()
  //   this.apiService.get(`articles/${article_id}.json`).then(articleData => {
  //     this.setArticleFormValues(articleData)
  //   })
  // }

  
  // updateArticle(articleObject) {
  //   this.apiService.startLoader()
  //   this.apiService.put(`articles/${this.article_id}.json`, articleObject).then(data => {
  //     this.router.navigateByUrl("/admin/article-list")
  //   })
  // }

  // async createArticle(articleObject) {
  //   this.apiService.startLoader()
  //   await this.apiService.post("articles.json", articleObject).then(result => {
  //     this.router.navigateByUrl("/admin/article-list")
  //   })
  // }

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
