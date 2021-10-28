import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';
import { ApiService } from '@app/shared/services/api.service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {
  articleForm: FormGroup;
  article_id: null
  config: any;
  author = JSON.parse(localStorage.getItem("userData"))
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleCrudService: ArticleCrudService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
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
      category:[""]
    });
  }

  getArticle(article_id) {
    this.apiService.startLoader()
    this.apiService.get(`articles/${article_id}.json`).then(articleData => {
      this.setArticleFormValues(articleData)
    })
  }

  setArticleFormValues(articleData) {
    this.articleForm.patchValue({
      title: articleData?.title,
      body: articleData?.body,
      date: articleData?.date,
      author: articleData?.author,
      category:articleData?.category
    })
  }


  submitForm() {
    let articleObject = {
      title: this.articleForm.value.title,
      body: this.articleForm.value.body,
      author: this.articleForm.value.author,
      category: this.articleForm.value.category,
      date: this.articleForm.value.date,
    }

    if (this.article_id) {
      this.updateArticle(articleObject)
    }
    else {
      this.createArticle(articleObject)
    }
  }

  async createArticle(articleObject) {
    this.apiService.startLoader()
    await this.apiService.post("articles.json", articleObject).then(result => {
      this.router.navigateByUrl("/admin/article-list")
    })
  }

  updateArticle(articleObject) {
    this.apiService.startLoader()
    this.apiService.put(`articles/${this.article_id}.json`, articleObject).then(data => {
      this.router.navigateByUrl("/admin/article-list")
    })
  }

  get f() {
    return this.articleForm.controls;
  }

  goBack() {
    this.router.navigateByUrl("/admin/article-list")
  }

}
