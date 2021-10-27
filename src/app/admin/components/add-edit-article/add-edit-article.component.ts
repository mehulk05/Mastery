import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleCrudService } from '@app/admin/services/article services/article-crud.service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {
  articleForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleCrudService:ArticleCrudService
  ) { }

  ngOnInit(): void {
    this.createArticleForm()
  }
  createArticleForm() {
    this.articleForm = this.fb.group({
      id: [""],
      title: ["", Validators.required],
      body: ["", Validators.required],
      date:[new Date()],
      author:["Mehul"]
  });

  }

  submitForm(){
    let articleObject = {
      title:this.articleForm.value.title,
      body:this.articleForm.value.body,
      author:this.articleForm.value.author,
      date:this.articleForm.value.date,
    }
    this.articleCrudService.createArticle(articleObject).subscribe(data=>{
      console.log(data)
      this.router.navigateByUrl("/admin/article-list")
    })

  }

  get f() {
    return this.articleForm.controls;
  }

  goBack(){
    console.log("bac")
    this.router.navigateByUrl("/admin/article-list")
  }

}
